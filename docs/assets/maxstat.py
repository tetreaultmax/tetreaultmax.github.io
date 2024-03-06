import pandas as pd
import numpy as np
import requests

import json 

all_nhl_teams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"];

def fetch_NHL_Data(team):
	url = "https://api-web.nhle.com/v1/roster/"+ team +"/20232024"
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
	url = "https://api-web.nhle.com/v1/player/"+player_id+"/landing"
	response = requests.get(url)
	data = response.json()
	if data["position"] != "G":
		player_stat = data["featuredStats"]["regularSeason"]["subSeason"]
		return {
			"Player_ID": player_id,
			"Player_Name": data["firstName"]["default"] + " " + data["lastName"]["default"],
			"Position": data["position"],
			"Team": data["currentTeamAbbrev"],
			"Games_Played": player_stat["gamesPlayed"],
			"Goals": player_stat["goals"],
			"Assists": player_stat["assists"],
			"Points": player_stat["points"],
			"Plus/Minus": player_stat["plusMinus"],
			"Penalty_Minutes": player_stat["pim"],
			"Game_winning_Goals": player_stat["gameWinningGoals"],
			"Shots": player_stat["shots"],
			"Shooting_Percentage": player_stat["shootingPctg"],
			'PowerPlayGoals': player_stat["powerPlayGoals"],
			'PowerPlayPoints': player_stat["powerPlayPoints"],
			'ShorthandedGoals': player_stat["shorthandedGoals"], 
			'ShorthandedPoints': player_stat["shorthandedPoints"]
		}

def get_all_NHL_Stats():
	all_stats = []
	for team in all_nhl_teams:
		team_roster = fetch_NHL_Data(team)
		for player in team_roster:
			player_stats = fetch_NHL_Stats(str(player))
			if player_stats is not None:	
				print(player_stats["Player_Name"])
				all_stats.append(player_stats)
	# create json file
	with open("nhl_stats.json", "w") as outfile: 
		json.dump(all_stats, outfile)

print(get_all_NHL_Stats())