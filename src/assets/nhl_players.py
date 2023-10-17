import requests
import csv


# Function to fetch player IDs
def fetch_player_ids(seasons):
	url = "https://statsapi.web.nhl.com/api/v1/teams"
	response = requests.get(url)
	data = response.json()
	players_data = {}
	for season in seasons:
		print(season)
		for team in data["teams"]:
			print(team["name"])		
			roster_url = f"https://statsapi.web.nhl.com/api/v1/teams/{team['id']}/roster?expand=team.roster&season={season}"
			roster_response = requests.get(roster_url)
			
			roster_data = roster_response.json()

			if "roster" not in roster_data:
				continue

			for player in roster_data["roster"]:
				if player["person"]["id"] not in players_data:
					players_data[player["person"]["id"]] = {
						"id": player["person"]["id"],
						"name": player["person"]["fullName"],
						"team": [team["name"]],
						"first_season": season[4:],  # Store the debut season
                        "last_season": season[4:],
					}
				else:
					if team["name"] not in players_data[player["person"]["id"]]["team"]:
						players_data[player["person"]["id"]]["team"].append(team["name"])
					# Update the last_season for subsequent appearances
					players_data[player["person"]["id"]]["first_season"] = season[4:]

	return players_data


# Function to save player data to a CSV file
def save_to_csv(player_data):
	filename = "nhl_players.csv"

	with open(filename, "w", newline="", encoding="utf-8") as csvfile:
		fieldnames = ["Player ID", "Player Name", "Teams", "First Season", "Last Season"]
		writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
		writer.writeheader()
		for player_id, player_info in player_data.items():
			writer.writerow({"Player ID": player_info["id"], "Player Name": player_info["name"], "Teams": ", ".join(player_info["team"]), "First Season": player_info["first_season"], "Last Season": player_info["last_season"]})

# Fetch player IDs
seasons = ["20232024","20222023", "20212022", "20202021", "20192020", "20182019", "20172018", "20162017", "20152016",
 "20142015", "20132014", "20122013", "20112012", "20102011", "20092010", "20082009", "20072008", "20062007",
 "20052006", "20042005", "20032004", "20022003", "20012002", "20002001", "19992000", "19981999", "19971998",
 "19961997", "19951996", "19941995", "19931994", "19921993", "19911992", "19901991", "19891990", "19881989",
 "19871988", "19861987", "19851986", "19841985", "19831984", "19821983", "19811982", "19801981", "19791980",
 "19781979", "19771978", "19761977", "19751976", "19741975", "19731974", "19721973", "19711972", "19701971",
 "19691970", "19681969", "19671968", "19661967", "19651966", "19641965", "19631964", "19621963", "19611962",
 "19601961", "19591960", "19581959", "19571958", "19561957", "19551956", "19541955", "19531954", "19521953",
 "19511952", "19501951"]
players_data = fetch_player_ids(seasons)

# Save player data to CSV file
save_to_csv(players_data)