        **WELCOME TO MY FIRST API PROJECT** 

WHAT ARE THE VERSION NEEDED OF (NODE.JS) AND (PostgreSQL)?   
    -FOR (PostgreSQL) ^8.7.3 OR ABOVE.

    -FOR (NODE.JS) v17.4.0 OR ABOVE


WHAT IS THIS API ABOUT?
    -THIS API IS ABOUT NEWS AND ARTICLES DIVERSITY, IT HAS THE FUNCTIONALIT OF BASIC (GET, PATCH, POST, DELETE).


WHAT IS THE LINK TO MY API?
    -TO TRY MY API USE THIS LINK: https://first-api-project1.herokuapp.com/

WHAT ARE ENDPOINTS AVAILBLE TO USE?
    -GET 
        /api/topics
        /api/articles/:article_id
        /api/articles
        /api/users
        /api/articles/:article_id/comments
    
    -PATCH 
        /api/articles/:article_id

    -POST 
        /api/articles/:article_id/comments

    -DELETE 
        /api/comments/:comment_id

HOW TO CLONE THE MY API REPO FROM GITHUB?
    -TO CLONE MY API REPO 
        1- COPY THIS LINK : https://github.com/FerasMasoud/news-project.git
        
        2- IN THE TERMINAL USE THIS COMMAND TO CLONE IT LOCALLY TO THE DIRECTORY OF YOU CHOICE
            (git clone https://github.com/FerasMasoud/news-project.git)
        
        3- AFTER CLONING SUCCEFULY COMPLETED USE THIS COMMANE TO OPEN PROJECT
            (code news-project.git) 

AFTER CLONING WHAT TO DO?
    -IMPORTANT STEPS
        1- RUN THIS COMMAND TO INSTALL ALL PACKAGES PROVIDED 
            (npm i)
        2- CREATE TWO (.env) FILES 
            1- (.env.development) AND INSIDE IT PUT THIS CODE (PGDATABASE=nc_news)
            2- (.env.test) AND INSIDE IT PUT THIS CODE (PGDATABASE=nc_news_test)

        3- RUN THIS COMMAND TO ESTABLISH CONNETINO TO (postgreSQL)
            (sudo service postgresql start)
        
        4- RUN THIS COMMAND (npm run setup-dbs)

        5- RUN THIS COMMAND TO TEST THE APP 
            (npm t app.test.js)
        
        6- IF YOU WANT TO RUN THE APP IN YOUR LOCAL HOST
            INSIDE (listen.js) FILE:
                REPLACE LINE 3 WITH THIS ( const {PORT=9090} = process.env; )
                    THEN TO RUN THE SERVER, RUN THIS COMMAND (npm start) 
        
        7- IN YOUR BROWSER SET THE URL TO THIS ( http://localhost:9090/ )

        8- ADD ANY OF THE AVAILABLE POINTS AFTER ('/')


THATS ALL :) 

THANK YOU FOR YOU TIME, AND ALWAYS NICE TO SEE YOU HERE :)

FerasMasoud.





