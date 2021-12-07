const DataTypes = require("sequelize").DataTypes;
const _Absence = require("./Absence");
const _Admin = require("./Admin");
const _Attendant = require("./Attendant");
const _Booked_seat = require("./Booked_seat");
const _Cart = require("./Cart");
const _Cast = require("./Cast");
const _Cast_of_movie = require("./Cast_of_movie");
const _Compliment = require("./Compliment");
const _Country = require("./Country");
const _Country_of_movie = require("./Country_of_movie");
const _Department = require("./Department");
const _Employee = require("./Employee");
const _Employee_notice = require("./Employee_notice");
const _Event = require("./Event");
const _Facility = require("./Facility");
const _Genre = require("./Genre");
const _Genre_of_movie = require("./Genre_of_movie");
const _Hall = require("./Hall");
const _Holiday = require("./Holiday");
const _Item = require("./Item");
const _Leave = require("./Leave");
const _Like_movie = require("./Like_movie");
const _Membership = require("./Membership");
const _Menu = require("./Menu");
const _Movie = require("./Movie");
const _Movie_schedule = require("./Movie_schedule");
const _Notice = require("./Notice");
const _Order = require("./Order");
const _Order_detail = require("./Order_detail");
const _Parking = require("./Parking");
const _Parking_lot = require("./Parking_lot");
const _Parking_space = require("./Parking_space");
const _Pay_record = require("./Pay_record");
const _Payment = require("./Payment");
const _Product = require("./Product");
const _Product_type = require("./Product_type");
const _Refund = require("./Refund");
const _Request = require("./Request");
const _Reservation = require("./Reservation");
const _Review = require("./Review");
const _Schedule = require("./Schedule");
const _Screen_management = require("./Screen_management");
const _Screening = require("./Screening");
const _Seat = require("./Seat");
const _Status_now = require("./Status_now");
const _Suggestion = require("./Suggestion");
const _Theater = require("./Theater");
const _Theater_facilities = require("./Theater_facilities");
const _Theater_items = require("./Theater_items");
const _User = require("./User");

function initModels(sequelize) {
  const Absence = _Absence(sequelize, DataTypes);
  const Admin = _Admin(sequelize, DataTypes);
  const Attendant = _Attendant(sequelize, DataTypes);
  const Booked_seat = _Booked_seat(sequelize, DataTypes);
  const Cart = _Cart(sequelize, DataTypes);
  const Cast = _Cast(sequelize, DataTypes);
  const Cast_of_movie = _Cast_of_movie(sequelize, DataTypes);
  const Compliment = _Compliment(sequelize, DataTypes);
  const Country = _Country(sequelize, DataTypes);
  const Country_of_movie = _Country_of_movie(sequelize, DataTypes);
  const Department = _Department(sequelize, DataTypes);
  const Employee = _Employee(sequelize, DataTypes);
  const Employee_notice = _Employee_notice(sequelize, DataTypes);
  const Event = _Event(sequelize, DataTypes);
  const Facility = _Facility(sequelize, DataTypes);
  const Genre = _Genre(sequelize, DataTypes);
  const Genre_of_movie = _Genre_of_movie(sequelize, DataTypes);
  const Hall = _Hall(sequelize, DataTypes);
  const Holiday = _Holiday(sequelize, DataTypes);
  const Item = _Item(sequelize, DataTypes);
  const Leave = _Leave(sequelize, DataTypes);
  const Like_movie = _Like_movie(sequelize, DataTypes);
  const Membership = _Membership(sequelize, DataTypes);
  const Menu = _Menu(sequelize, DataTypes);
  const Movie = _Movie(sequelize, DataTypes);
  const Movie_schedule = _Movie_schedule(sequelize, DataTypes);
  const Notice = _Notice(sequelize, DataTypes);
  const Order = _Order(sequelize, DataTypes);
  const Order_detail = _Order_detail(sequelize, DataTypes);
  const Parking = _Parking(sequelize, DataTypes);
  const Parking_lot = _Parking_lot(sequelize, DataTypes);
  const Parking_space = _Parking_space(sequelize, DataTypes);
  const Pay_record = _Pay_record(sequelize, DataTypes);
  const Payment = _Payment(sequelize, DataTypes);
  const Product = _Product(sequelize, DataTypes);
  const Product_type = _Product_type(sequelize, DataTypes);
  const Refund = _Refund(sequelize, DataTypes);
  const Request = _Request(sequelize, DataTypes);
  const Reservation = _Reservation(sequelize, DataTypes);
  const Review = _Review(sequelize, DataTypes);
  const Schedule = _Schedule(sequelize, DataTypes);
  const Screen_management = _Screen_management(sequelize, DataTypes);
  const Screening = _Screening(sequelize, DataTypes);
  const Seat = _Seat(sequelize, DataTypes);
  const Status_now = _Status_now(sequelize, DataTypes);
  const Suggestion = _Suggestion(sequelize, DataTypes);
  const Theater = _Theater(sequelize, DataTypes);
  const Theater_facilities = _Theater_facilities(sequelize, DataTypes);
  const Theater_items = _Theater_items(sequelize, DataTypes);
  const User = _User(sequelize, DataTypes);

  Cast_of_movie.belongsTo(Cast, { as: "cast", foreignKey: "cast_id"});
  Cast.hasMany(Cast_of_movie, { as: "Cast_of_movies", foreignKey: "cast_id"});
  Country_of_movie.belongsTo(Country, { as: "country", foreignKey: "country_id"});
  Country.hasMany(Country_of_movie, { as: "Country_of_movies", foreignKey: "country_id"});
  Employee.belongsTo(Department, { as: "department", foreignKey: "department_id"});
  Department.hasMany(Employee, { as: "Employees", foreignKey: "department_id"});
  Facility.belongsTo(Department, { as: "department", foreignKey: "department_id"});
  Department.hasMany(Facility, { as: "Facilities", foreignKey: "department_id"});
  Item.belongsTo(Department, { as: "department", foreignKey: "department_id"});
  Department.hasMany(Item, { as: "Items", foreignKey: "department_id"});
  Parking_space.belongsTo(Department, { as: "department", foreignKey: "department_id"});
  Department.hasMany(Parking_space, { as: "Parking_spaces", foreignKey: "department_id"});
  Absence.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Absence, { as: "Absences", foreignKey: "employee_id"});
  Attendant.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Attendant, { as: "Attendants", foreignKey: "employee_id"});
  Compliment.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Compliment, { as: "Compliments", foreignKey: "employee_id"});
  Leave.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Leave, { as: "Leaves", foreignKey: "employee_id"});
  Pay_record.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Pay_record, { as: "Pay_records", foreignKey: "employee_id"});
  Request.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Request, { as: "Requests", foreignKey: "employee_id"});
  Schedule.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Schedule, { as: "Schedules", foreignKey: "employee_id"});
  Status_now.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Status_now, { as: "Status_nows", foreignKey: "employee_id"});
  Suggestion.belongsTo(Employee, { as: "employee", foreignKey: "employee_id"});
  Employee.hasMany(Suggestion, { as: "Suggestions", foreignKey: "employee_id"});
  Screen_management.belongsTo(Facility, { as: "facility", foreignKey: "facility_id"});
  Facility.hasMany(Screen_management, { as: "Screen_managements", foreignKey: "facility_id"});
  Genre_of_movie.belongsTo(Genre, { as: "genre", foreignKey: "genre_id"});
  Genre.hasMany(Genre_of_movie, { as: "Genre_of_movies", foreignKey: "genre_id"});
  Movie_schedule.belongsTo(Hall, { as: "hall", foreignKey: "hall_id"});
  Hall.hasMany(Movie_schedule, { as: "Movie_schedules", foreignKey: "hall_id"});
  Seat.belongsTo(Hall, { as: "hall", foreignKey: "hall_id"});
  Hall.hasMany(Seat, { as: "Seats", foreignKey: "hall_id"});
  User.belongsTo(Membership, { as: "membership", foreignKey: "membership_id"});
  Membership.hasMany(User, { as: "Users", foreignKey: "membership_id"});
  Cast_of_movie.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Cast_of_movie, { as: "Cast_of_movies", foreignKey: "movie_id"});
  Country_of_movie.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Country_of_movie, { as: "Country_of_movies", foreignKey: "movie_id"});
  Genre_of_movie.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Genre_of_movie, { as: "Genre_of_movies", foreignKey: "movie_id"});
  Like_movie.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Like_movie, { as: "Like_movies", foreignKey: "movie_id"});
  Movie_schedule.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Movie_schedule, { as: "Movie_schedules", foreignKey: "movie_id"});
  Review.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Review, { as: "Reviews", foreignKey: "movie_id"});
  Reservation.belongsTo(Movie_schedule, { as: "movie_schedule", foreignKey: "movie_schedule_id"});
  Movie_schedule.hasMany(Reservation, { as: "Reservations", foreignKey: "movie_schedule_id"});
  Order_detail.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(Order_detail, { as: "Order_details", foreignKey: "order_id"});
  Refund.belongsTo(Order_detail, { as: "order_detail_Order_detail", foreignKey: "order_detail"});
  Order_detail.hasMany(Refund, { as: "Refunds", foreignKey: "order_detail"});
  Payment.belongsTo(Parking, { as: "parking", foreignKey: "parking_id"});
  Parking.hasMany(Payment, { as: "Payments", foreignKey: "parking_id"});
  Parking_space.belongsTo(Parking_lot, { as: "parking_lot", foreignKey: "parking_lot_id"});
  Parking_lot.hasMany(Parking_space, { as: "Parking_spaces", foreignKey: "parking_lot_id"});
  Parking.belongsTo(Parking_space, { as: "parking_space", foreignKey: "parking_space_id"});
  Parking_space.hasMany(Parking, { as: "Parkings", foreignKey: "parking_space_id"});
  Cart.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Cart, { as: "Carts", foreignKey: "product_id"});
  Order_detail.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Order_detail, { as: "Order_details", foreignKey: "product_id"});
  Product.belongsTo(Product_type, { as: "product_type", foreignKey: "product_type_id"});
  Product_type.hasMany(Product, { as: "Products", foreignKey: "product_type_id"});
  Booked_seat.belongsTo(Reservation, { as: "reservation", foreignKey: "reservation_id"});
  Reservation.hasMany(Booked_seat, { as: "Booked_seats", foreignKey: "reservation_id"});
  Payment.belongsTo(Reservation, { as: "reservation", foreignKey: "reservation_id"});
  Reservation.hasMany(Payment, { as: "Payments", foreignKey: "reservation_id"});
  Screen_management.belongsTo(Screening, { as: "screening", foreignKey: "screening_id"});
  Screening.hasMany(Screen_management, { as: "Screen_managements", foreignKey: "screening_id"});
  Booked_seat.belongsTo(Seat, { as: "seat", foreignKey: "seat_id"});
  Seat.hasMany(Booked_seat, { as: "Booked_seats", foreignKey: "seat_id"});
  Department.belongsTo(Theater, { as: "theater", foreignKey: "theater_id"});
  Theater.hasMany(Department, { as: "Departments", foreignKey: "theater_id"});
  Hall.belongsTo(Theater, { as: "theater", foreignKey: "theater_id"});
  Theater.hasMany(Hall, { as: "Halls", foreignKey: "theater_id"});
  Parking_lot.belongsTo(Theater, { as: "theater", foreignKey: "theater_id"});
  Theater.hasMany(Parking_lot, { as: "Parking_lots", foreignKey: "theater_id"});
  Facility.belongsTo(Theater_facilities, { as: "facility", foreignKey: "facilities_id"});
  Theater_facilities.hasMany(Facility, { as: "Facilities", foreignKey: "facilities_id"});
  Item.belongsTo(Theater_items, { as: "item", foreignKey: "items_id"});
  Theater_items.hasMany(Item, { as: "Items", foreignKey: "items_id"});
  Cart.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Cart, { as: "Carts", foreignKey: "user_id"});
  Like_movie.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Like_movie, { as: "Like_movies", foreignKey: "user_id"});
  Order.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Order, { as: "Orders", foreignKey: "user_id"});
  Reservation.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Reservation, { as: "Reservations", foreignKey: "user_id"});
  Review.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Review, { as: "Reviews", foreignKey: "user_id"});

  return {
    Absence,
    Admin,
    Attendant,
    Booked_seat,
    Cart,
    Cast,
    Cast_of_movie,
    Compliment,
    Country,
    Country_of_movie,
    Department,
    Employee,
    Employee_notice,
    Event,
    Facility,
    Genre,
    Genre_of_movie,
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
    Request,
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
