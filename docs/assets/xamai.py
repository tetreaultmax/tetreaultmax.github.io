import pandas as pd
import numpy as np
import requests
import json 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

game_ids = []
all_nhl_teams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"];

def fetchGameId(team):
	print(team)
	url = "https://api-web.nhle.com/v1/club-schedule-season/"+ team+ "/20232024"
	response = requests.get(url)
	data = response.json()
	# Game schedule
	data = data["games"]
	# Get all game ids
	for game in data:
		if game["id"] not in game_ids:
			game_ids.append(game["id"])

def fetchAllIds():
	for team in all_nhl_teams:
		fetchGameId(team)
	# save game ids in json
	with open("game_ids.json", "w") as outfile: 
		json.dump(game_ids, outfile)

def fetchGameStats():
	# read json file
	with open("game_ids.json") as f:
		game_ids = json.load(f)
		all_game_stats = []
		i = 1
		for game in game_ids:
			print(i/len(game_ids)*100, "%")
			url = "https://api-web.nhle.com/v1/gamecenter/"+ str(game) + "/play-by-play"
			response = requests.get(url)
			data = response.json()
			all_game_stats.append(data["plays"])
			i +=1
		with open("game_stats.json", "w") as outfile: 
			json.dump(all_game_stats, outfile)

def filterGameShot():
	with open("game_stats.json") as f:
		game_stats = json.load(f)
		all_shots = []
		for event_in_game in game_stats:
			for event in event_in_game:
				# Keep goal, shot-on-goal and missed-shot events
				if event["typeDescKey"] == "goal" or event["typeDescKey"] == "shot-on-goal" or event["typeDescKey"] == "missed-shot":
					all_shots.append(event)
		with open("all_shots.json", "w") as outfile: 
			json.dump(all_shots, outfile)


def buildMatrixShot():
	with open("all_shots.json") as f:
		shots = json.load(f)
		print(len(shots))
		dataFrame = pd.DataFrame()
		i = 1
		for shot in shots:
			print(i/len(shots)*100, "%")
			shotDetail = shot["details"]
			if shot["typeDescKey"] == "goal":
				detail = {
					"goal": 1,
					"xCoord": shotDetail.get("xCoord"),
					"yCoord": shotDetail.get("yCoord"),
					"shotType": shotDetail.get("shotType"),
					"playerId": shotDetail.get("scoringPlayerId"),
					"goalieId": shotDetail.get("goalieInNetId")
				}
			else:
				detail = {
					"goal": 0,
					"xCoord": shotDetail.get("xCoord"),
					"yCoord": shotDetail.get("yCoord"),
					"shotType": shotDetail.get("shotType"),
					"playerId": shotDetail.get("shootingPlayerId"),
					"goalieId": shotDetail.get("goalieInNetId")
				}
			dataFrame = pd.concat([dataFrame, pd.DataFrame([detail])], ignore_index=True)
			i += 1
		dataFrame.to_csv("test.csv", index=False)


def getDataShot():
	data = pd.read_csv("shots.csv")
	data = data.dropna()

	# transform type in string
	data["playerId"] = data["playerId"].astype(int)
	data["goalieId"] = data["goalieId"].astype(int)
	data["playerId"] = data["playerId"].astype(str)
	data["goalieId"] = data["goalieId"].astype(str)

	dummies = pd.get_dummies(data["shotType"])
	data = pd.concat([data, dummies], axis=1)
	data = data.drop(columns=["shotType"])

	dummies = pd.get_dummies(data["playerId"])
	data = pd.concat([data, dummies], axis=1)
	data = data.drop(columns=["playerId"])

	dummies = pd.get_dummies(data["goalieId"])
	data = pd.concat([data, dummies], axis=1)
	data = data.drop(columns=["goalieId"])
	return data

def logisticRegression():
	data = getDataShot()
	X = data.drop(columns=["goal"])
	y = data["goal"]

	from sklearn.model_selection import train_test_split
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

	from sklearn.linear_model import LogisticRegression
	model = LogisticRegression()
	model.fit(X_train, y_train)

	predictions = model.predict(X_test)

	from sklearn.metrics import classification_report
	print(classification_report(y_test, predictions))
	print(model.score(X_test, y_test))
	# Print coeff in a df to see the most important features
	coeff = pd.DataFrame(model.coef_, columns=X.columns) 
	# round the coefficient to 2 decimal places
	coeff = coeff.round(3)

	# Json file where key is the feature and value is the coefficient
	with open("coeff.json", "w") as outfile:
		json.dump(coeff.to_dict(), outfile)
	print(coeff) 