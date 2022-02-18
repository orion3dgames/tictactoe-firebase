# Tic Tac Toe - Firebase
A small personal to test my skills. End goal is for users to easily 
share a link to a friend to play a quick session of tic tac toe, with 
a global leaderboard.

## Technology
I will be using Firebase Realtime Database, with anonymous authetification.

## Firebase Structure (WIP)
```
{
    "players" : {
        "RLE6jSaKCSM85mE6RPQ1nnqN8zA3" : {
            "displayName" : "plug25",
            "score" : 30,
            "sessions" : {
                "-Mw9C4TSKto437hNOkyC": 'challenger',
            },
            "uid" : "RLE6jSaKCSM85mE6RPQ1nnqN8zA3"
        },
        "xzZ23VqDmAbOBScFK9d746pN0Wo1" : {
            "displayName" : "Gull45",
            "score" : 25,
            "sessions" : {
                "-Mw9C4TSKto437hNOkyC": 'challenger',
            },
            "uid" : "xzZ23VqDmAbOBScFK9d746pN0Wo1"
        },
    },
    "sessions" : {
        "-Mw9C4TSKto437hNOkyC" : {
            "challenger" : {
                "displayName" : "plug25", // ?? Not sure if this should be here
                "score" : 10,
                "symbol" : "O",
                "uid" : "RLE6jSaKCSM85mE6RPQ1nnqN8zA3"
            },
            "creator" : {
                "displayName" : "Gull45", // ?? Not sure if this should be here
                "score" : 20,
                "symbol" : "X",
                "uid" : "xzZ23VqDmAbOBScFK9d746pN0Wo1"
            },
            "draw" : 0,
            "latest_winner" : "creator",
            "messages" : "",
            "play_board" : [ "", "", "", "", "", "", "", "", "" ],
            "player_turn" : "xzZ23VqDmAbOBScFK9d746pN0Wo1",
            "started": 0,
            "deleted": 0,
            "uid" : "-Mw9C4TSKto437hNOkyC",
            "history" : {
                "uid": [ "X", "X", "O", "X", "O", "O", "X", "O", "X" ],
                "uid": [ "X", "X", "O", "X", "O", "O", "X", "O", "X" ],
            }
        }
    }
}
```

## Installation Guide
- Clone the repository
- Open a terminal and launch these commands from the root folder
- ```yarn install``` (install client dependencies)
- ```yarn serve``` (launch a dev session)
- go to "localhost:8080" to view the game.