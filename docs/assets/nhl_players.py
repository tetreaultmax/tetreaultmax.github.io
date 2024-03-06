import requests
import csv
import json 

all_nhl_teams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"];

def fetch_NHL_Data(team, season):
	url = "https://api-web.nhle.com/v1/roster/"+ team + "/" + season
	response = requests.get(url)
	data = response.json()
	all_id_roster = []
	for position in data.keys():
		position_data = data[position]
		for player in position_data:
			all_id_roster.append(player["id"])
	
	return all_id_roster

def fetch_NHL_Stats(player_id):
	# 8478483
	url = "https://api-web.nhle.com/v1/player/"+ str(player_id) +"/landing"
	response = requests.get(url)
	data = response.json()
	# print all key = season
	all_seasons = []
	all_team = []
	for item in data["seasonTotals"]:
		if item["leagueAbbrev"] == "NHL":
			all_seasons.append(item["season"])
			currentTeam = item["teamName"]["default"]
			if currentTeam != "Phoenix Coyotes":
				if currentTeam not in all_team:
					all_team.append(currentTeam)
	return {
		"id": player_id,
		"name": data["firstName"]["default"] + " " + data["lastName"]["default"],
		"team": all_team,
		"first_season": str(all_seasons[0])[4:],
		"last_season": str(all_seasons[-1])[4:],
	}

def get_all_NHL_Stats(seasons):
	all_stats = []
	ids_done = []
	for season in seasons:
		for team in all_nhl_teams:
			team_roster = fetch_NHL_Data(team, season)
			for player in team_roster:
				# check if playerid is not in the dictionary
				if player in ids_done:
					continue
				player_stats = fetch_NHL_Stats(str(player))
				ids_done.append(player)
				if player_stats is not None:	
					print(player_stats["name"])
					all_stats.append(player_stats)
	with open("test.json", "w") as outfile: 
		json.dump(all_stats, outfile)



# Fetch player IDs
seasons = ["20232024"]

for season in seasons:
	get_all_NHL_Stats(seasons)