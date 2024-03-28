// create the relations and the tables
const sequelize = require("../database/index")
const {Admin} = require("../model/adminModel")
const {Category} = require("../model/categoriesModel")
const {Client} = require("../model/clientModel")
const {Employee} = require("../model/employeeModel")
const {Mission} = require("../model/missionModel")
const {Notification} = require("../model/notificationModel")
const {PackHasServices} = require("../model/packHasServicesModel")
const {Pack} = require("../model/packModel")
const {Payment} = require("../model/paymentModel")
const {Presence} = require("../model/presenceModel")
const {Rating} = require("../model/ratingsModel")
const {Report} = require("../model/reportModel")
const {Request} = require("../model/requestModel")
const {Service} = require("../model/servicesModel")
const {Supervisor} = require("../model/supervisorModel")
const {Team} = require("../model/teamModel")

Client.hasOne(Rating, {foreignKey:"client_id"});
Client.hasOne(Pack, {foreignKey:"client_id"});
Client.hasMany(Notification, {foreignKey:"client_id"});
Client.hasMany(Report, {foreignKey:"client_id"});
Client.hasMany(Request, {foreignKey:"client_id"});

Team.hasMany(Employee, {foreignKey:"team_id"});
Team.hasMany(Mission, {foreignKey:"team_id"})

Category.hasMany(Service, {foreignKey: "category_id"});

Supervisor.hasOne(Team, {foreignKey: "supervisor_id"});
Supervisor.hasMany(Report, {foreignKey: "supervisor_id"});

Pack.hasMany(Request, {foreignKey: 'pack_id'});
Pack.belongsToMany(Service, { through: PackHasServices , foreignKey:"pack_id"});
Service.belongsToMany(Pack, { through: PackHasServices , foreignKey:"service_id"});

Request.hasOne(Mission, {foreignKey:"request_id"});
Request.hasOne(Payment, {foreignKey:"request_id"});

Pack.hasOne(Notification, {foreignKey:"pack_id"})

Employee.hasMany(Presence, {foreignKey: "employee_id"});

sequelize.sync()