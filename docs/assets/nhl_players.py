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

def fetch_NHL_Stats(player_id, career):
	url = "https://api-web.nhle.com/v1/player/"+ str(player_id) +"/landing"
	response = requests.get(url)
	data = response.json()
	all_seasons = []
	all_team = []
	for item in data["seasonTotals"]:
		if item["leagueAbbrev"] == "NHL":
			all_seasons.append(item["season"])
			currentTeam = item["teamName"]["default"]
			if currentTeam != "Phoenix Coyotes":
				if career:
					if len(all_team) > 0 and all_team[-1] == currentTeam:
						continue
					all_team.append(currentTeam)
				elif currentTeam not in all_team:
					all_team.append(currentTeam)
	if len(all_seasons) == 0:
		return None
	return {
		"Player ID": int(player_id),
		"Player Name": data["firstName"]["default"] + " " + data["lastName"]["default"],
		"Teams": all_team,
		"First Season": int(str(all_seasons[0])[4:]),
		"Last Season": int(str(all_seasons[-1])[4:]),
	}

def get_all_NHL_Stats(seasons, career):
	all_stats = []
	ids_done = []
	for season in seasons:
		for team in all_nhl_teams:
			team_roster = fetch_NHL_Data(team, season)
			for player in team_roster:
				if player in ids_done:
					continue
				player_stats = fetch_NHL_Stats(str(player), career)
				if player_stats is not None:	
					all_stats.append(player_stats)
					print(player_stats["Player Name"])
					ids_done.append(player)
	if career:
		with open("nhl_players_career.json", "w") as outfile: 
			json.dump(all_stats, outfile)
	else:
		with open("nhl_players.json", "w") as outfile: 
			json.dump(all_stats, outfile)


get_all_NHL_Stats(["20232024"], True)