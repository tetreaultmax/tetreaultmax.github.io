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
						"team": [team["name"]]
					}
				else:
					if team["name"] not in players_data[player["person"]["id"]]["team"]:
						players_data[player["person"]["id"]]["team"].append(team["name"])

	return players_data


# Function to save player data to a CSV file
def save_to_csv(player_data):
	filename = "nhl_players.csv"

	with open(filename, "w", newline="", encoding="utf-8") as csvfile:
		fieldnames = ["Player ID", "Player Name", "Teams"]
		writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
		writer.writeheader()
		for player_id, player_info in player_data.items():
			writer.writerow({"Player ID": player_info["id"], "Player Name": player_info["name"], "Teams": ", ".join(player_info["team"])})

# Fetch player IDs
seasons = ["20222023", "20212022", "20202021", "20192020", "20182019", "20172018", "20162017", "20152016", "20142015", "20132014", "20122013"]
players_data = fetch_player_ids(seasons)

# Save player data to CSV file
save_to_csv(players_data)