![Screenshot](/header.png)

# WEB103 Project 2 - *Stockify*

Submitted by: Thierry Laguerre

About this web app: stock-listicle

Time spent: **4** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM tablename;` to display your table contents.**

The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute

## Video Walkthrough

**Note: please be sure to**

Here's a walkthrough of implemented required features:

<img src='https://imgur.com/a/6fwi5Er' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ... Add GIF tool here
<!-- Recommended tools:
[Kap](https.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.

## 🛠️ Installation and Setup

1.  **Clone and Install**

    First, navigate to your project folder in the terminal and install the necessary dependencies:

    ```bash
    npm install
    ```

2.  **Environment Variables**

    Create a `.env` file in the root directory of your project. You will need your credentials from the Render Dashboard.

    Fill in the following with your Render PostgreSQL details:

    ```plaintext
    PGDATABASE="your_database_name"
    PGHOST="your_hostname_from_render"
    PGPASSWORD="your_password"
    PGPORT=5432
    PGUSER="your_username"
    ```

3.  **Initialize the Database**

    Before running the app for the first time, you must create the tables and seed the data. I have automated this into a single command:

    ```bash
    npm run reset
    ```

    You should see "🎉 stocks table created successfully" and success messages for each stock added.

4.  **Run the Application**

    Start the server:

    ```bash
    npm start
    ```

    The server will now be live at http://localhost:3001.

## License

Copyright 2026 Thierry Laguerre

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
