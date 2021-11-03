var DataTypes = require("sequelize").DataTypes;
var _Absence = require("./Absence");
var _Attendant = require("./Attendant");
var _Booked_seat = require("./Booked_seat");
var _Cart = require("./Cart");
var _Cast = require("./Cast");
var _Cast_of_movie = require("./Cast_of_movie");
var _Compliment = require("./Compliment");
var _Department = require("./Department");
var _Employee = require("./Employee");
var _Employee_notice = require("./Employee_notice");
var _Event = require("./Event");
var _Facility = require("./Facility");
var _Hall = require("./Hall");
var _Holiday = require("./Holiday");
var _Item = require("./Item");
var _Leave = require("./Leave");
var _Like_movie = require("./Like_movie");
var _Membership = require("./Membership");
var _Menu = require("./Menu");
var _Movie = require("./Movie");
var _Movie_schedule = require("./Movie_schedule");
var _Notice = require("./Notice");
var _Order = require("./Order");
var _Order_detail = require("./Order_detail");
var _Parking = require("./Parking");
var _Parking_lot = require("./Parking_lot");
var _Parking_space = require("./Parking_space");
var _Pay_record = require("./Pay_record");
var _Payment = require("./Payment");
var _Product = require("./Product");
var _Product_type = require("./Product_type");
var _Refund = require("./Refund");
var _Reservation = require("./Reservation");
var _Review = require("./Review");
var _Schedule = require("./Schedule");
var _Screen_management = require("./Screen_management");
var _Screening = require("./Screening");
var _Seat = require("./Seat");
var _Status_now = require("./Status_now");
var _Suggestion = require("./Suggestion");
var _Theater = require("./Theater");
var _Theater_facilities = require("./Theater_facilities");
var _Theater_items = require("./Theater_items");
var _User = require("./User");

function initModels(sequelize) {
  var Absence = _Absence(sequelize, DataTypes);
  var Attendant = _Attendant(sequelize, DataTypes);
  var Booked_seat = _Booked_seat(sequelize, DataTypes);
  var Cart = _Cart(sequelize, DataTypes);
  var Cast = _Cast(sequelize, DataTypes);
  var Cast_of_movie = _Cast_of_movie(sequelize, DataTypes);
  var Compliment = _Compliment(sequelize, DataTypes);
  var Department = _Department(sequelize, DataTypes);
  var Employee = _Employee(sequelize, DataTypes);
  var Employee_notice = _Employee_notice(sequelize, DataTypes);
  var Event = _Event(sequelize, DataTypes);
  var Facility = _Facility(sequelize, DataTypes);
  var Hall = _Hall(sequelize, DataTypes);
  var Holiday = _Holiday(sequelize, DataTypes);
  var Item = _Item(sequelize, DataTypes);
  var Leave = _Leave(sequelize, DataTypes);
  var Like_movie = _Like_movie(sequelize, DataTypes);
  var Membership = _Membership(sequelize, DataTypes);
  var Menu = _Menu(sequelize, DataTypes);
  var Movie = _Movie(sequelize, DataTypes);
  var Movie_schedule = _Movie_schedule(sequelize, DataTypes);
  var Notice = _Notice(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Order_detail = _Order_detail(sequelize, DataTypes);
  var Parking = _Parking(sequelize, DataTypes);
  var Parking_lot = _Parking_lot(sequelize, DataTypes);
  var Parking_space = _Parking_space(sequelize, DataTypes);
  var Pay_record = _Pay_record(sequelize, DataTypes);
  var Payment = _Payment(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Product_type = _Product_type(sequelize, DataTypes);
  var Refund = _Refund(sequelize, DataTypes);
  var Reservation = _Reservation(sequelize, DataTypes);
  var Review = _Review(sequelize, DataTypes);
  var Schedule = _Schedule(sequelize, DataTypes);
  var Screen_management = _Screen_management(sequelize, DataTypes);
  var Screening = _Screening(sequelize, DataTypes);
  var Seat = _Seat(sequelize, DataTypes);
  var Status_now = _Status_now(sequelize, DataTypes);
  var Suggestion = _Suggestion(sequelize, DataTypes);
  var Theater = _Theater(sequelize, DataTypes);
  var Theater_facilities = _Theater_facilities(sequelize, DataTypes);
  var Theater_items = _Theater_items(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    Absence,
    Attendant,
    Booked_seat,
    Cart,
    Cast,
    Cast_of_movie,
    Compliment,
    Department,
    Employee,
    Employee_notice,
    Event,
    Facility,
    Hall,
    Holiday,
    Item,
    Leave,
    Like_movie,
    Membership,
    Menu,
    Movie,
    Movie_schedule,
    Notice,
    Order,
    Order_detail,
    Parking,
    Parking_lot,
    Parking_space,
    Pay_record,
    Payment,
    Product,
    Product_type,
    Refund,
    Reservation,
    Review,
    Schedule,
    Screen_management,
    Screening,
    Seat,
    Status_now,
    Suggestion,
    Theater,
    Theater_facilities,
    Theater_items,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
