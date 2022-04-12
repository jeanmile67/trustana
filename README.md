# Trustana Case study - Backend developer

The project is divided in 2 parts :
 - Backend (NodeJS)
 - FrontEnd (ReactJS)

And used Mongo as a database.
## Installation

Build Backend and FrontEnd app with the docker images:
```bash
docker build ./backend/. -t jeanmile/trustana-backend
docker build ./frontend/. -t jeanmile/trustana-frontend
```

You should see the image, let's check it with :
```bash
docker images
```
An image called "jeanmile/trustana-backend" and "jeanmile/trustana-frontend" should appear :
```bash
± # docker images 
REPOSITORY                    TAG       IMAGE ID       CREATED          SIZE
jeanmile/trustana-frontend    latest    fa533ad22616   8 seconds ago    1.3GB
jeanmile/trustana-backend     latest    52fa8cbc7ab0   44 seconds ago   1.05GB
```

Run docker-compose to build and deploy all the project.

```bash
docker-compose -f docker-compose.yml up
```

You should be able to access to the backend with on this url 
```bash
http://localhost:5000/about
```

## Usage

Backend route to create a new job

The backend expect at least one parameter 'URL'
| Parameters      | Description | required     | default value    |
| :---        |    :----:   |          ---: |          ---: |
| url      | Url to the website to call       | yes   |    |
| frequency      | Frequency in minute       |  no  | 1   |
| method   | HTTP method        | no      |GET    |
| h:header   | Text        | no      |       |
| v:payload   | Text        | no      |       |

Only this method is accepted : ['GET', 'POST', 'PUT', 'DELETE']
Only this frequency is accepted : [0.5, 1, 5, 15, 30, 60]

For example : 
```bash
curl -d "method=GET&url=http://www.google.com" -X POST http://localhost:5000/api/request
```

To chain data on the payload 
```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"method":"POST","url":"http://www.google.com", "h:header1":"test", "h:header2":"header2", "v:data1":"test", "v:data2":"test2"}' \
    http://localhost:5000/api/request
```

To access to the frontend :
```bash
http://localhost:3000
```