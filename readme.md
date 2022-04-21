<a href="https://aimeos.org/">
    <img src="https://i.ibb.co/8P4m5hB/Icon-Go-Rental.png" alt="Aimeos logo" title="Aimeos" align="right" />
</a>

# Go - Rental Backend

Go - Rental is plan and book your perfect trip with expert advice, travel tips for vehicle information from us



[![Postman](https://user-images.githubusercontent.com/39787908/164381909-d91da867-38b5-4f2b-aaad-b7002ff709ba.jpg)](#)

## Installation

1. Clone this repo
```
git clone https://github.com/asherginting/fw5-backend-beginner.git
```

2. Install module
```
npm install
```

3. Make your database <b> vehicle_rent.sql

[![Postman](https://user-images.githubusercontent.com/39787908/164382316-ed2d6769-b669-49b7-b1d6-122034d35709.jpg)](#)
[![Postman](https://user-images.githubusercontent.com/39787908/164382710-e8d65a86-2f8a-49ff-b28a-f73be747b69d.jpg)](#)
[![Postman](https://user-images.githubusercontent.com/39787908/164382837-f0945591-bad9-4a6d-9013-e5dfb6e6cde0.jpg)](#)

4. Done, ```npm run start``` or ```npm run dev``` to run the project

<br>

Runs the app default in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

#### Auth
|    METHOD    |               API               |                     REMARKS                     |
| :----------: | :-----------------------------: | :---------------------------------------------: |
|  ```POST```   | /auth/register | Register Account |
|  ```POST```   |          /auth/verification          |              Verification after Registration              |
|  ```POST```  |            /auth/login            |               Login Account               |
| ```POST```  |          /auth/forgot         |            Forgot Password            |

#### Categories 
|    METHOD    |                API                |                      REMARKS                      |
| :----------: | :-------------------------------: | :-----------------------------------------------: |
|  ```GET```   | /categories/?search=&page=&limit= | Get Categories With Search By Type And Pagination |
|  ```GET```   |          /categories/:id          |            Get Category By ID             |
|  ```POST```  |            /categories            |                Input Data Category                |
| ```PATCH```  |          /categories/:id          |          Edi Category By ID          |
| ```DELETE``` |          /categories/:id          |           Delete Category By ID           |

#### Histories 
|    METHOD    |               API                |                 REMARKS                  |
| :----------: | :------------------------------: | :--------------------------------------: |
|  ```GET```   | /histories/?search=&page=&limit= | Get Histories With Search And Pagination |
|  ```GET```   |          /histories/:id          |         Get History By ID         |
|  ```POST```  |            /histories            |            Add History            |
| ```PATCH```  |          /histories/:id          |      Edit history By ID      |
| ```DELETE``` |          /histories/:id          |       Delete History By ID       |

#### Popular 
|  METHOD   |              API               |                         REMARKS                         |
| :-------: | :----------------------------: | :-----------------------------------------------------: |
| ```GET``` | /popular/?search=&page=&limit= | Get Popular Vehicles With Search By Type And Pagination |

#### Profile 
|  METHOD   |     API      |        REMARKS        |
| :-------: | :----------: | :-------------------: |
| ```GET``` | /profile/:id | Get Profile By ID |
| ```PATCH``` | /profile/ | Edit Profile |

#### Users
|    METHOD    |             API              |                    REMARKS                    |
| :----------: | :--------------------------: | :-------------------------------------------: |
|  ```GET```   | /users/?search=&page=&limit= | Get Users With Search By Name And Pagingation |
|  ```GET```   |          /users/:id          |            Get User By ID            |
|  ```POST```  |            /users            |               Add User              |
| ```PATCH```  |          /users/:id          |           Edit User By ID            |
| ```DELETE``` |          /users/:id          |             Delete User By ID             |

#### Vehicles Endpoint
|    METHOD    |               API               |                     REMARKS                     |
| :----------: | :-----------------------------: | :---------------------------------------------: |
|  ```GET```   | /vehicles/?search=&page=&limit= | Get Vehicles With Search By Type And Pagination |
|  ```GET```   |          /vehicles/:id          |              Get Vehicle By ID              |
|  ```POST```  |            /vehicles            |               Add Vehicle               |
| ```PATCH```  |          /vehicles/:id          |            Edit Vehicle By ID            |
| ```DELETE``` |          /vehicles/:id          |           Delete Vehicle By ID           |

## ⛏️ Built Using

- [Eslint](https://www.npmjs.com/package/eslint)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express Js](https://www.npmjs.com/package/express)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [MySQL](https://www.npmjs.com/package/mysql)
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
## 💻 Frontend & Responsive Web

Repo Frontend : https://github.com/asherginting/Go-Rental-Web
<br>
Repo Responsive Web : https://github.com/asherginting/Go-Rental-Responsive

## ✍️ Authors

- [@asherginting](https://github.com/asherginting)