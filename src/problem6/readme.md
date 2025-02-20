# Problem 6: Architecture

## Overview

This module is responsible for handling score updates for a scoreboard on a website. The scoreboard displays the top 10 user scores and requires live updates as users perform actions that increase their scores.

## Features

- **Live Scoreboard Updates**: The scoreboard updates in real-time as users perform actions.
- **Secure Score Updates**: Ensures that only authorized users can update their scores to prevent malicious activities.

## Flow of Execution

1. **User Action**: A user performs an action on the client application.
2. **Score Update Request**: The client application sends a request to the API server to update the user's score.
3. **Authentication**: The API server validates the user's authentication status with the authentication service.
4. **Score Update**: Upon successful authentication, the API server updates the user's score using the score service.
5. **Confirmation**: The API server sends a confirmation back to the client application.
6. **Display Update**: The client application updates the scoreboard display for the user.

## Improvements and comments

- Ensure all communications between the client application and the API server are encrypted.
- Implement robust authentication and authorization mechanisms to prevent unauthorized score updates.
- Use HTTPS for all communications between the client and the API server.
- Use a secure authentication method, such as JWT (JSON Web Tokens), to authenticate users.
- Implement rate limiting to prevent abuse of the score update feature.
- Cache the scoreboard data to reduce the number of database queries and improve performance.
- Add detailed logging for monitoring and debugging purposes.
- Implement websockets to send real-time updates to the scoreboard.

## Diagram

![Architecture Diagram](https://github.com/ardiantutomo/99Tech-code-challenge/blob/main/src/problem6/architecture.png)
