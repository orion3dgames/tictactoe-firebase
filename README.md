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
            "score" : 0,
            "sessions" : false,
            "uid" : "RLE6jSaKCSM85mE6RPQ1nnqN8zA3"
        },
    },
    "sessions" : {
        "-Mw9C4TSKto437hNOkyC" : {
            "challenger" : {
                "displayName" : "plug25",
                "score" : 0,
                "symbol" : "",
                "uid" : "RLE6jSaKCSM85mE6RPQ1nnqN8zA3"
            },
            "creator" : {
                "displayName" : "Gull45",
                "score" : 0,
                "symbol" : "",
                "uid" : "xzZ23VqDmAbOBScFK9d746pN0Wo1"
            },
            "draw" : 0,
            "latest_winner" : "creator",
            "messages" : "",
            "play_board" : [ "", "", "", "", "", "", "", "", "" ],
            "player_turn" : "xzZ23VqDmAbOBScFK9d746pN0Wo1",
            "started" : 1,
            "uid" : "-Mw9C4TSKto437hNOkyC"
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