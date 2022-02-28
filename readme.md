<p align="center">
  <a href="" rel="noopener">
 <a href="https://imgbb.com/"><img src="https://i.ibb.co/8P4m5hB/Icon-Go-Rental.png" alt="Icon-Go-Rental" border="0"></a>
</p>

---

## 🧐 About
This is the repository fw5-backend-beginner
## Instalation

1. Clone this repo
```
git clone https://github.com/asherginting/fw5-backend-beginner.git
```

2. Install module
```
npm install
```

3. Import Database <b> vehicle_rent.sql 

4. Done

<br>

Runs the app default in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

#### Vehicles Endpoint
|    METHOD    |               API               |                     REMARKS                     |
| :----------: | :-----------------------------: | :---------------------------------------------: |
|  ```GET```   | /vehicles/?search=&page=&limit= | Get Vehicles With Search By Type And Pagination |
|  ```GET```   |          /vehicles/:id          |              Get Data By idVehicle              |
|  ```POST```  |            /vehicles            |               Input Data Vehicles               |
| ```PATCH```  |          /vehicles/:id          |            Edit Vehicle By idVehicle            |
| ```DELETE``` |          /vehicles/:id          |           Delete Vehicle By idVehicle           |

#### Users Endpoint
|    METHOD    |             API              |                    REMARKS                    |
| :----------: | :--------------------------: | :-------------------------------------------: |
|  ```GET```   | /users/?search=&page=&limit= | Get Users With Search By Name And Pagingation |
|  ```GET```   |          /users/:id          |            Get Data User By idUser            |
|  ```POST```  |            /users            |               Input Data Users                |
| ```PATCH```  |          /users/:id          |           Edit Data User By idUser            |
| ```DELETE``` |          /users/:id          |             Delete User By idUser             |

#### Popular Vehicles Endpoint
|  METHOD   |              API               |                         REMARKS                         |
| :-------: | :----------------------------: | :-----------------------------------------------------: |
| ```GET``` | /popular/?search=&page=&limit= | Get Popular Vehicles With Search By Type And Pagination |

#### Profile  Endpoint
|  METHOD   |     API      |        REMARKS        |
| :-------: | :----------: | :-------------------: |
| ```GET``` | /profile/:id | Get Profile By idUser |

#### Histories Endpoint
|    METHOD    |               API                |                 REMARKS                  |
| :----------: | :------------------------------: | :--------------------------------------: |
|  ```GET```   | /histories/?search=&page=&limit= | Get Histories With Search And Pagination |
|  ```GET```   |          /histories/:id          |         Get History By idHistory         |
|  ```POST```  |            /histories            |            Input Data History            |
| ```PATCH```  |          /histories/:id          |      Edit Data history By idHistory      |
| ```DELETE``` |          /histories/:id          |       Delete History By idHistory        |

#### Categories Endpoint
|    METHOD    |                API                |                      REMARKS                      |
| :----------: | :-------------------------------: | :-----------------------------------------------: |
|  ```GET```   | /categories/?search=&page=&limit= | Get Categories With Search By Type And Pagination |
|  ```GET```   |          /categories/:id          |            Get Category By idCategory             |
|  ```POST```  |            /categories            |                Input Data Category                |
| ```PATCH```  |          /categories/:id          |          Edit Data History By idCategory          |
| ```DELETE``` |          /categories/:id          |           Delete Category By idCategory           |

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

Repo Frontend : https://github.com/asherginting/fw5-react-frontend
<br>
Repo Responsive Web : https://github.com/asherginting/fw5-responsive-website

## ✍️ Authors

- [@asherginting](https://github.com/asherginting)