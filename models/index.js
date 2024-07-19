// // Seed and update model into table
// Seed and create table user, employee, car, city
// const users = require('./users');
// users.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table user, employee, car, city updated!`)
//     })

// Seed and create table employee
// const employee = require('./employee');
// employee.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table employee updated!`)
//     })

// Seed and create table rule
// const rules = require('./rules');
// rules.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table rules updated!`)
//     })

// Seed and create table level
// const level = require('./level');
// level.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table level updated!`)
//     })

// Seed and create table user rules
// const userules = require('./user_rules');
// userules.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table user rules updated!`)
//     })

// Seed and create table business
// const business = require('./business');
// business.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table business updated!`)
//     })

// Seed and create table company
// const company = require('./company');
// company.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table company updated!`)
//     })

// Seed and create table customer, business, company
// const customer = require('./customer');
// customer.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table customer, business, company updated!`)
//     })

// Seed and create table address, customer
// const address = require('./address');
// address.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table address, customer updated!`)
//     })

// Seed and create table category
// const category = require('./category');
// category.sequelize.sync({ alter: true })
//     .then(() => {
//         // Feed value category
//         // category.bulkCreate([
//         //     {
//         //         id: 1,
//         //         name: "Air",
//         //         category_id: 5,
//         //     },
//         //     {
//         //         id: 2,
//         //         name: "Minyak",
//         //         category_id: 5,
//         //     },
//         // ]);
//         console.log(`Table category updated!`)
//     })

// Seed and create table sub category
// const subCategory = require('./category_sub');
// subCategory.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table sub category updated!`)
//     })

// Seed and create table package
// const package = require('./package');
// package.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table package updated!`)
//     })

// Seed and create table sender
// const sender = require('./sender');
// sender.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table go send updated!`)
//     })

// Seed and create table recipient
// const recipient = require('./recipient');
// recipient.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table go recipient updated!`)
//     })

// Seed and create table delivery package
// const deliveryPackage = require('./delivery_package');
// deliveryPackage.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table go delivery package updated!`)
//     })

// Seed and create table go send
// const gosend = require('./go_send');
// gosend.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table go send updated!`)
//     })

// Seed and create table passenger
// const passenger = require('./passenger');
// passenger.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table passenger updated!`)
//     })

// Seed and create table waybill
// const waybill = require('./waybill');
// waybill.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table waybill updated!`)
//     })

// Seed and create table destination
// const destination = require('./destination');
// destination.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Table destination updated!`)
//     })

// const City = require('./city');
// City.sequelize.sync({ alter: true }).then(() => {
//     initCity1();
//     initCity2();
//     initCity3();
//     initCity4();
//     initCity5();
//     initCity6();
//     initCity7();
//     initCity8();
//     initCity9();
//     initCity10();
//     initCity11();
//     initCity12();
//     initCity13();
//     initCity14();
//     initCity15();
//     initCity16();
//     initCity17();
//     initCity18();
//     initCity19();
//     initCity20();
//     initCity21();
//     initCity22();
//     initCity23();
//     initCity24();
//     initCity25();
//     initCity26();
//     initCity27();
//     initCity28();
//     initCity29();
//     initCity30();
//     initCity31();
//     initCity32();
//     initCity33();
//     initCity34();
// });

// Seed multiple value
function initProvinces() {
  Province.bulkCreate(
    [
      {
        name: "Aceh"
      },
      {
        name: "Sumatera Utara"
      },
      {
        name: "Sumatera Barat"
      },
      {
        name: "Riau"
      },
      {
        name: "Jambi"
      },
      {
        name: "Sumatera Selatan"
      },
      {
        name: "Bengkulu"
      },
      {
        name: "Lampung"
      },
      {
        name: "Kepulauan Bangka Belitung"
      },
      {
        name: "Kepulauan Riau"
      },
      {
        name: "Dki Jakarta"
      },
      {
        name: "Jawa Barat"
      },
      {
        name: "Jawa Tengah"
      },
      {
        name: "Di Yogyakarta"
      },
      {
        name: "Jawa Timur"
      },
      {
        name: "Banten"
      },
      {
        name: "Bali"
      },
      {
        name: "Nusa Tenggara Barat"
      },
      {
        name: "Nusa Tenggara Timur"
      },
      {
        name: "Kalimantan Barat"
      },
      {
        name: "Kalimantan Tengah"
      },
      {
        name: "Kalimantan Selatan"
      },
      {
        name: "Kalimantan Timur"
      },
      {
        name: "Kalimantan Utara"
      },
      {
        name: "Sulawesi Utara"
      },
      {
        name: "Sulawesi Tengah"
      },
      {
        name: "Sulawesi Selatan"
      },
      {
        name: "Sulawesi Tenggara"
      },
      {
        name: "Gorontalo"
      },
      {
        name: "Sulawesi Barat"
      },
      {
        name: "Maluku"
      },
      {
        name: "Maluku Utara"
      },
      {
        name: "Papua Barat"
      },
      {
        name: "Papua"
      }
    ]
  );
}

// Seed value Aceh 1
function initCity1() {
  City.bulkCreate(
    [
      {
        province_id: 1,
        name: "Kabupaten Simeulue"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Singkil"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Selatan"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Tenggara"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Timur"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Tengah"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Barat"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Besar"
      },
      {
        province_id: 1,
        name: "Kabupaten Pidie"
      },
      {
        province_id: 1,
        name: "Kabupaten Bireuen"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Utara"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Barat Daya"
      },
      {
        province_id: 1,
        name: "Kabupaten Gayo Lues"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Tamiang"
      },
      {
        province_id: 1,
        name: "Kabupaten Nagan Raya"
      },
      {
        province_id: 1,
        name: "Kabupaten Aceh Jaya"
      },
      {
        province_id: 1,
        name: "Kabupaten Bener Meriah"
      },
      {
        province_id: 1,
        name: "Kabupaten Pidie Jaya"
      },
      {
        province_id: 1,
        name: "Kota Banda Aceh"
      },
      {
        province_id: 1,
        name: "Kota Sabang"
      },
      {
        province_id: 1,
        name: "Kota Langsa"
      },
      {
        province_id: 1,
        name: "Kota Lhokseumawe"
      },
      {
        province_id: 1,
        name: "Kota Subulussalam"
      }
    ]
  );
}

// Seed value Sumatera Utara 2
function initCity2() {
  City.bulkCreate(
    [
      {
        province_id: 2,
        name: "Kabupaten Nias"
      },
      {
        province_id: 2,
        name: "Kabupaten Mandailing Natal"
      },
      {
        province_id: 2,
        name: "Kabupaten Tapanuli Selatan"
      },
      {
        province_id: 2,
        name: "Kabupaten Tapanuli Tengah"
      },
      {
        province_id: 2,
        name: "Kabupaten Tapanuli Utara"
      },
      {
        province_id: 2,
        name: "Kabupaten Toba Samosir"
      },
      {
        province_id: 2,
        name: "Kabupaten Labuhan Batu"
      },
      {
        province_id: 2,
        name: "Kabupaten Asahan"
      },
      {
        province_id: 2,
        name: "Kabupaten Simalungun"
      },
      {
        province_id: 2,
        name: "Kabupaten Dairi"
      },
      {
        province_id: 2,
        name: "Kabupaten Karo"
      },
      {
        province_id: 2,
        name: "Kabupaten Deli Serdang"
      },
      {
        province_id: 2,
        name: "Kabupaten Langkat"
      },
      {
        province_id: 2,
        name: "Kabupaten Nias Selatan"
      },
      {
        province_id: 2,
        name: "Kabupaten Humbang Hasundutan"
      },
      {
        province_id: 2,
        name: "Kabupaten Pakpak Bharat"
      },
      {
        province_id: 2,
        name: "Kabupaten Samosir"
      },
      {
        province_id: 2,
        name: "Kabupaten Serdang Bedagai"
      },
      {
        province_id: 2,
        name: "Kabupaten Batu Bara"
      },
      {
        province_id: 2,
        name: "Kabupaten Padang Lawas Utara"
      },
      {
        province_id: 2,
        name: "Kabupaten Padang Lawas"
      },
      {
        province_id: 2,
        name: "Kabupaten Labuhan Batu Selatan"
      },
      {
        province_id: 2,
        name: "Kabupaten Labuhan Batu Utara"
      },
      {
        province_id: 2,
        name: "Kabupaten Nias Utara"
      },
      {
        province_id: 2,
        name: "Kabupaten Nias Barat"
      },
      {
        province_id: 2,
        name: "Kota Sibolga"
      },
      {
        province_id: 2,
        name: "Kota Tanjung Balai"
      },
      {
        province_id: 2,
        name: "Kota Pematang Siantar"
      },
      {
        province_id: 2,
        name: "Kota Tebing Tinggi"
      },
      {
        province_id: 2,
        name: "Kota Medan"
      },
      {
        province_id: 2,
        name: "Kota Binjai"
      },
      {
        province_id: 2,
        name: "Kota Padangsidimpuan"
      },
      {
        province_id: 2,
        name: "Kota Gunungsitoli"
      }
    ]
  );
}

// Seed value Sumatera Barat 3
function initCity3() {
  City.bulkCreate(
    [
      {
        province_id: 3,
        name: "Kabupaten Kepulauan Mentawai"
      },
      {
        province_id: 3,
        name: "Kabupaten Pesisir Selatan"
      },
      {
        province_id: 3,
        name: "Kabupaten Solok"
      },
      {
        province_id: 3,
        name: "Kabupaten Sijunjung"
      },
      {
        province_id: 3,
        name: "Kabupaten Tanah Datar"
      },
      {
        province_id: 3,
        name: "Kabupaten Padang Pariaman"
      },
      {
        province_id: 3,
        name: "Kabupaten Agam"
      },
      {
        province_id: 3,
        name: "Kabupaten Lima Puluh Kota"
      },
      {
        province_id: 3,
        name: "Kabupaten Pasaman"
      },
      {
        province_id: 3,
        name: "Kabupaten Solok Selatan"
      },
      {
        province_id: 3,
        name: "Kabupaten Dharmasraya"
      },
      {
        province_id: 3,
        name: "Kabupaten Pasaman Barat"
      },
      {
        province_id: 3,
        name: "Kota Padang"
      },
      {
        province_id: 3,
        name: "Kota Solok"
      },
      {
        province_id: 3,
        name: "Kota Sawah Lunto"
      },
      {
        province_id: 3,
        name: "Kota Padang Panjang"
      },
      {
        province_id: 3,
        name: "Kota Bukittinggi"
      },
      {
        province_id: 3,
        name: "Kota Payakumbuh"
      },
      {
        province_id: 3,
        name: "Kota Pariaman"
      }
    ]
  );
}

// Seed value Riau 4
function initCity4() {
  City.bulkCreate(
    [
      {
        province_id: 4,
        name: "Kabupaten Kuantan Singingi"
      },
      {
        province_id: 4,
        name: "Kabupaten Indragiri Hulu"
      },
      {
        province_id: 4,
        name: "Kabupaten Indragiri Hilir"
      },
      {
        province_id: 4,
        name: "Kabupaten Pelalawan"
      },
      {
        province_id: 4,
        name: "Kabupaten S I A K"
      },
      {
        province_id: 4,
        name: "Kabupaten Kampar"
      },
      {
        province_id: 4,
        name: "Kabupaten Rokan Hulu"
      },
      {
        province_id: 4,
        name: "Kabupaten Bengkalis"
      },
      {
        province_id: 4,
        name: "Kabupaten Rokan Hilir"
      },
      {
        province_id: 4,
        name: "Kabupaten Kepulauan Meranti"
      },
      {
        province_id: 4,
        name: "Kota Pekanbaru"
      },
      {
        province_id: 4,
        name: "Kota D U M A I"
      }
    ]
  );
}

// Seed value Jambi 5
function initCity5() {
  City.bulkCreate(
    [
      {
        province_id: 5,
        name: "Kabupaten Kerinci"
      },
      {
        province_id: 5,
        name: "Kabupaten Merangin"
      },
      {
        province_id: 5,
        name: "Kabupaten Sarolangun"
      },
      {
        province_id: 5,
        name: "Kabupaten Batang Hari"
      },
      {
        province_id: 5,
        name: "Kabupaten Muaro Jambi"
      },
      {
        province_id: 5,
        name: "Kabupaten Tanjung Jabung Timur"
      },
      {
        province_id: 5,
        name: "Kabupaten Tanjung Jabung Barat"
      },
      {
        province_id: 5,
        name: "Kabupaten Tebo"
      },
      {
        province_id: 5,
        name: "Kabupaten Bungo"
      },
      {
        province_id: 5,
        name: "Kota Jambi"
      },
      {
        province_id: 5,
        name: "Kota Sungai Penuh"
      }
    ]
  );
}

// Seed value Sumatera Selatan 6
function initCity6() {
  City.bulkCreate(
    [
      {
        province_id: 6,
        name: "Kabupaten Ogan Komering Ulu"
      },
      {
        province_id: 6,
        name: "Kabupaten Ogan Komering Ilir"
      },
      {
        province_id: 6,
        name: "Kabupaten Muara Enim"
      },
      {
        province_id: 6,
        name: "Kabupaten Lahat"
      },
      {
        province_id: 6,
        name: "Kabupaten Musi Rawas"
      },
      {
        province_id: 6,
        name: "Kabupaten Musi Banyuasin"
      },
      {
        province_id: 6,
        name: "Kabupaten Banyu Asin"
      },
      {
        province_id: 6,
        name: "Kabupaten Ogan Komering Ulu Selatan"
      },
      {
        province_id: 6,
        name: "Kabupaten Ogan Komering Ulu Timur"
      },
      {
        province_id: 6,
        name: "Kabupaten Ogan Ilir"
      },
      {
        province_id: 6,
        name: "Kabupaten Empat Lawang"
      },
      {
        province_id: 6,
        name: "Kabupaten Penukal Abab Lematang Ilir"
      },
      {
        province_id: 6,
        name: "Kabupaten Musi Rawas Utara"
      },
      {
        province_id: 6,
        name: "Kota Palembang"
      },
      {
        province_id: 6,
        name: "Kota Prabumulih"
      },
      {
        province_id: 6,
        name: "Kota Pagar Alam"
      },
      {
        province_id: 6,
        name: "Kota Lubuklinggau"
      }
    ]
  );
}

// Seed value Bengkulu 7
function initCity7() {
  City.bulkCreate(
    [
      {
        province_id: 7,
        name: "Kabupaten Bengkulu Selatan"
      },
      {
        province_id: 7,
        name: "Kabupaten Rejang Lebong"
      },
      {
        province_id: 7,
        name: "Kabupaten Bengkulu Utara"
      },
      {
        province_id: 7,
        name: "Kabupaten Kaur"
      },
      {
        province_id: 7,
        name: "Kabupaten Seluma"
      },
      {
        province_id: 7,
        name: "Kabupaten Mukomuko"
      },
      {
        province_id: 7,
        name: "Kabupaten Lebong"
      },
      {
        province_id: 7,
        name: "Kabupaten Kepahiang"
      },
      {
        province_id: 7,
        name: "Kabupaten Bengkulu Tengah"
      },
      {
        province_id: 7,
        name: "Kota Bengkulu"
      }
    ]
  );
}

// Seed value Lampung 8
function initCity8() {
  City.bulkCreate(
    [
      {
        province_id: 8,
        name: "Kabupaten Lampung Barat"
      },
      {
        province_id: 8,
        name: "Kabupaten Tanggamus"
      },
      {
        province_id: 8,
        name: "Kabupaten Lampung Selatan"
      },
      {
        province_id: 8,
        name: "Kabupaten Lampung Timur"
      },
      {
        province_id: 8,
        name: "Kabupaten Lampung Tengah"
      },
      {
        province_id: 8,
        name: "Kabupaten Lampung Utara"
      },
      {
        province_id: 8,
        name: "Kabupaten Way Kanan"
      },
      {
        province_id: 8,
        name: "Kabupaten Tulangbawang"
      },
      {
        province_id: 8,
        name: "Kabupaten Pesawaran"
      },
      {
        province_id: 8,
        name: "Kabupaten Pringsewu"
      },
      {
        province_id: 8,
        name: "Kabupaten Mesuji"
      },
      {
        province_id: 8,
        name: "Kabupaten Tulang Bawang Barat"
      },
      {
        province_id: 8,
        name: "Kabupaten Pesisir Barat"
      },
      {
        province_id: 8,
        name: "Kota Bandar Lampung"
      },
      {
        province_id: 8,
        name: "Kota Metro"
      }
    ]
  );
}

// Seed value Kepulauan Bangka Belitung 9
function initCity9() {
  City.bulkCreate(
    [
      {
        province_id: 9,
        name: "Kabupaten Bangka"
      },
      {
        province_id: 9,
        name: "Kabupaten Belitung"
      },
      {
        province_id: 9,
        name: "Kabupaten Bangka Barat"
      },
      {
        province_id: 9,
        name: "Kabupaten Bangka Tengah"
      },
      {
        province_id: 9,
        name: "Kabupaten Bangka Selatan"
      },
      {
        province_id: 9,
        name: "Kabupaten Belitung Timur"
      },
      {
        province_id: 9,
        name: "Kota Pangkal Pinang"
      }
    ]
  );
}

// Seed value Kepulauan Riau 10
function initCity10() {
  City.bulkCreate(
    [
      {
        province_id: 10,
        name: "Kabupaten Karimun"
      },
      {
        province_id: 10,
        name: "Kabupaten Bintan"
      },
      {
        province_id: 10,
        name: "Kabupaten Natuna"
      },
      {
        province_id: 10,
        name: "Kabupaten Lingga"
      },
      {
        province_id: 10,
        name: "Kabupaten Kepulauan Anambas"
      },
      {
        province_id: 10,
        name: "Kota B A T A M"
      },
      {
        province_id: 10,
        name: "Kota Tanjung Pinang"
      }
    ]
  );
}

// Seed value DKI Jakarta 11
function initCity11() {
  City.bulkCreate(
    [
      {
        province_id: 11,
        name: "Kabupaten Kepulauan Seribu"
      },
      {
        province_id: 11,
        name: "Kota Jakarta Selatan"
      },
      {
        province_id: 11,
        name: "Kota Jakarta Timur"
      },
      {
        province_id: 11,
        name: "Kota Jakarta Pusat"
      },
      {
        province_id: 11,
        name: "Kota Jakarta Barat"
      },
      {
        province_id: 11,
        name: "Kota Jakarta Utara"
      }
    ]
  );
}

// Seed value Jawa Barat 12
function initCity12() {
  City.bulkCreate(
    [
      {
        province_id: 12,
        name: "Kabupaten Bogor"
      },
      {
        province_id: 12,
        name: "Kabupaten Sukabumi"
      },
      {
        province_id: 12,
        name: "Kabupaten Cianjur"
      },
      {
        province_id: 12,
        name: "Kabupaten Bandung"
      },
      {
        province_id: 12,
        name: "Kabupaten Garut"
      },
      {
        province_id: 12,
        name: "Kabupaten Tasikmalaya"
      },
      {
        province_id: 12,
        name: "Kabupaten Ciamis"
      },
      {
        province_id: 12,
        name: "Kabupaten Kuningan"
      },
      {
        province_id: 12,
        name: "Kabupaten Cirebon"
      },
      {
        province_id: 12,
        name: "Kabupaten Majalengka"
      },
      {
        province_id: 12,
        name: "Kabupaten Sumedang"
      },
      {
        province_id: 12,
        name: "Kabupaten Indramayu"
      },
      {
        province_id: 12,
        name: "Kabupaten Subang"
      },
      {
        province_id: 12,
        name: "Kabupaten Purwakarta"
      },
      {
        province_id: 12,
        name: "Kabupaten Karawang"
      },
      {
        province_id: 12,
        name: "Kabupaten Bekasi"
      },
      {
        province_id: 12,
        name: "Kabupaten Bandung Barat"
      },
      {
        "id": 3218,
        province_id: 12,
        name: "Kabupaten Pangandaran"
      },
      {
        province_id: 12,
        name: "Kota Bogor"
      },
      {
        province_id: 12,
        name: "Kota Sukabumi"
      },
      {
        province_id: 12,
        name: "Kota Bandung"
      },
      {
        province_id: 12,
        name: "Kota Cirebon"
      },
      {
        province_id: 12,
        name: "Kota Bekasi"
      },
      {
        province_id: 12,
        name: "Kota Depok"
      },
      {
        province_id: 12,
        name: "Kota Cimahi"
      },
      {
        province_id: 12,
        name: "Kota Tasikmalaya"
      },
      {
        province_id: 12,
        name: "Kota Banjar"
      }
    ]
  );
}

// Seed value Jawa Tengah 13
function initCity13() {
  City.bulkCreate(
    [
      {
        province_id: 13,
        name: "Kabupaten Cilacap"
      },
      {
        province_id: 13,
        name: "Kabupaten Banyumas"
      },
      {
        province_id: 13,
        name: "Kabupaten Purbalingga"
      },
      {
        province_id: 13,
        name: "Kabupaten Banjarnegara"
      },
      {
        province_id: 13,
        name: "Kabupaten Kebumen"
      },
      {
        province_id: 13,
        name: "Kabupaten Purworejo"
      },
      {
        province_id: 13,
        name: "Kabupaten Wonosobo"
      },
      {
        province_id: 13,
        name: "Kabupaten Magelang"
      },
      {
        province_id: 13,
        name: "Kabupaten Boyolali"
      },
      {
        province_id: 13,
        name: "Kabupaten Klaten"
      },
      {
        province_id: 13,
        name: "Kabupaten Sukoharjo"
      },
      {
        province_id: 13,
        name: "Kabupaten Wonogiri"
      },
      {
        province_id: 13,
        name: "Kabupaten Karanganyar"
      },
      {
        province_id: 13,
        name: "Kabupaten Sragen"
      },
      {
        province_id: 13,
        name: "Kabupaten Grobogan"
      },
      {
        province_id: 13,
        name: "Kabupaten Blora"
      },
      {
        province_id: 13,
        name: "Kabupaten Rembang"
      },
      {
        province_id: 13,
        name: "Kabupaten Pati"
      },
      {
        province_id: 13,
        name: "Kabupaten Kudus"
      },
      {
        province_id: 13,
        name: "Kabupaten Jepara"
      },
      {
        province_id: 13,
        name: "Kabupaten Demak"
      },
      {
        province_id: 13,
        name: "Kabupaten Semarang"
      },
      {
        province_id: 13,
        name: "Kabupaten Temanggung"
      },
      {
        province_id: 13,
        name: "Kabupaten Kendal"
      },
      {
        province_id: 13,
        name: "Kabupaten Batang"
      },
      {
        province_id: 13,
        name: "Kabupaten Pekalongan"
      },
      {
        province_id: 13,
        name: "Kabupaten Pemalang"
      },
      {
        province_id: 13,
        name: "Kabupaten Tegal"
      },
      {
        province_id: 13,
        name: "Kabupaten Brebes"
      },
      {
        province_id: 13,
        name: "Kota Magelang"
      },
      {
        province_id: 13,
        name: "Kota Surakarta"
      },
      {
        province_id: 13,
        name: "Kota Salatiga"
      },
      {
        province_id: 13,
        name: "Kota Semarang"
      },
      {
        province_id: 13,
        name: "Kota Pekalongan"
      },
      {
        province_id: 13,
        name: "Kota Tegal"
      }
    ]
  );
}

// Seed value DI Yogyakarta 14
function initCity14() {
  City.bulkCreate(
    [
      {
        province_id: 14,
        name: "Kabupaten Kulon Progo"
      },
      {
        province_id: 14,
        name: "Kabupaten Bantul"
      },
      {
        province_id: 14,
        name: "Kabupaten Gunung Kidul"
      },
      {
        province_id: 14,
        name: "Kabupaten Sleman"
      },
      {
        province_id: 14,
        name: "Kota Yogyakarta"
      }
    ]
  );
}

// Seed value Jawa Timur 15
function initCity15() {
  City.bulkCreate(
    [
      {
        province_id: 15,
        name: "Kabupaten Pacitan"
      },
      {
        province_id: 15,
        name: "Kabupaten Ponorogo"
      },
      {
        province_id: 15,
        name: "Kabupaten Trenggalek"
      },
      {
        province_id: 15,
        name: "Kabupaten Tulungagung"
      },
      {
        province_id: 15,
        name: "Kabupaten Blitar"
      },
      {
        province_id: 15,
        name: "Kabupaten Kediri"
      },
      {
        province_id: 15,
        name: "Kabupaten Malang"
      },
      {
        province_id: 15,
        name: "Kabupaten Lumajang"
      },
      {
        province_id: 15,
        name: "Kabupaten Jember"
      },
      {
        province_id: 15,
        name: "Kabupaten Banyuwangi"
      },
      {
        province_id: 15,
        name: "Kabupaten Bondowoso"
      },
      {
        province_id: 15,
        name: "Kabupaten Situbondo"
      },
      {
        province_id: 15,
        name: "Kabupaten Probolinggo"
      },
      {
        province_id: 15,
        name: "Kabupaten Pasuruan"
      },
      {
        province_id: 15,
        name: "Kabupaten Sidoarjo"
      },
      {
        province_id: 15,
        name: "Kabupaten Mojokerto"
      },
      {
        province_id: 15,
        name: "Kabupaten Jombang"
      },
      {
        province_id: 15,
        name: "Kabupaten Nganjuk"
      },
      {
        province_id: 15,
        name: "Kabupaten Madiun"
      },
      {
        province_id: 15,
        name: "Kabupaten Magetan"
      },
      {
        province_id: 15,
        name: "Kabupaten Ngawi"
      },
      {
        province_id: 15,
        name: "Kabupaten Bojonegoro"
      },
      {
        province_id: 15,
        name: "Kabupaten Tuban"
      },
      {
        province_id: 15,
        name: "Kabupaten Lamongan"
      },
      {
        province_id: 15,
        name: "Kabupaten Gresik"
      },
      {
        province_id: 15,
        name: "Kabupaten Bangkalan"
      },
      {
        province_id: 15,
        name: "Kabupaten Sampang"
      },
      {
        province_id: 15,
        name: "Kabupaten Pamekasan"
      },
      {
        province_id: 15,
        name: "Kabupaten Sumenep"
      },
      {
        province_id: 15,
        name: "Kota Kediri"
      },
      {
        province_id: 15,
        name: "Kota Blitar"
      },
      {
        province_id: 15,
        name: "Kota Malang"
      },
      {
        province_id: 15,
        name: "Kota Probolinggo"
      },
      {
        province_id: 15,
        name: "Kota Pasuruan"
      },
      {
        province_id: 15,
        name: "Kota Mojokerto"
      },
      {
        province_id: 15,
        name: "Kota Madiun"
      },
      {
        province_id: 15,
        name: "Kota Surabaya"
      },
      {
        province_id: 15,
        name: "Kota Batu"
      }
    ]
  );
}

// Seed value Banten 16
function initCity16() {
  City.bulkCreate(
    [
      {
        province_id: 16,
        name: "Kabupaten Pandeglang"
      },
      {
        province_id: 16,
        name: "Kabupaten Lebak"
      },
      {
        province_id: 16,
        name: "Kabupaten Tangerang"
      },
      {
        province_id: 16,
        name: "Kabupaten Serang"
      },
      {
        province_id: 16,
        name: "Kota Tangerang"
      },
      {
        province_id: 16,
        name: "Kota Cilegon"
      },
      {
        province_id: 16,
        name: "Kota Serang"
      },
      {
        province_id: 16,
        name: "Kota Tangerang Selatan"
      }
    ]
  );
}

// Seed value Bali 17
function initCity17() {
  City.bulkCreate(
    [
      {
        province_id: 17,
        name: "Kabupaten Jembrana"
      },
      {
        province_id: 17,
        name: "Kabupaten Tabanan"
      },
      {
        province_id: 17,
        name: "Kabupaten Badung"
      },
      {
        province_id: 17,
        name: "Kabupaten Gianyar"
      },
      {
        province_id: 17,
        name: "Kabupaten Klungkung"
      },
      {
        province_id: 17,
        name: "Kabupaten Bangli"
      },
      {
        province_id: 17,
        name: "Kabupaten Karang Asem"
      },
      {
        province_id: 17,
        name: "Kabupaten Buleleng"
      },
      {
        province_id: 17,
        name: "Kota Denpasar"
      }
    ]
  );
}

// Seed value Nusa Tenggara Barat 18
function initCity18() {
  City.bulkCreate(
    [
      {
        province_id: 18,
        name: "Kabupaten Lombok Barat"
      },
      {
        province_id: 18,
        name: "Kabupaten Lombok Tengah"
      },
      {
        province_id: 18,
        name: "Kabupaten Lombok Timur"
      },
      {
        province_id: 18,
        name: "Kabupaten Sumbawa"
      },
      {
        province_id: 18,
        name: "Kabupaten Dompu"
      },
      {
        province_id: 18,
        name: "Kabupaten Bima"
      },
      {
        province_id: 18,
        name: "Kabupaten Sumbawa Barat"
      },
      {
        province_id: 18,
        name: "Kabupaten Lombok Utara"
      },
      {
        province_id: 18,
        name: "Kota Mataram"
      },
      {
        province_id: 18,
        name: "Kota Bima"
      }
    ]
  );
}

// Seed value Nusa Tenggara Timur 19
function initCity19() {
  City.bulkCreate(
    [
      {
        province_id: 19,
        name: "Kabupaten Sumba Barat"
      },
      {
        province_id: 19,
        name: "Kabupaten Sumba Timur"
      },
      {
        province_id: 19,
        name: "Kabupaten Kupang"
      },
      {
        province_id: 19,
        name: "Kabupaten Timor Tengah Selatan"
      },
      {
        province_id: 19,
        name: "Kabupaten Timor Tengah Utara"
      },
      {
        province_id: 19,
        name: "Kabupaten Belu"
      },
      {
        province_id: 19,
        name: "Kabupaten Alor"
      },
      {
        province_id: 19,
        name: "Kabupaten Lembata"
      },
      {
        province_id: 19,
        name: "Kabupaten Flores Timur"
      },
      {
        province_id: 19,
        name: "Kabupaten Sikka"
      },
      {
        province_id: 19,
        name: "Kabupaten Ende"
      },
      {
        province_id: 19,
        name: "Kabupaten Ngada"
      },
      {
        province_id: 19,
        name: "Kabupaten Manggarai"
      },
      {
        province_id: 19,
        name: "Kabupaten Rote Ndao"
      },
      {
        province_id: 19,
        name: "Kabupaten Manggarai Barat"
      },
      {
        province_id: 19,
        name: "Kabupaten Sumba Tengah"
      },
      {
        province_id: 19,
        name: "Kabupaten Sumba Barat Daya"
      },
      {
        province_id: 19,
        name: "Kabupaten Nagekeo"
      },
      {
        province_id: 19,
        name: "Kabupaten Manggarai Timur"
      },
      {
        province_id: 19,
        name: "Kabupaten Sabu Raijua"
      },
      {
        province_id: 19,
        name: "Kabupaten Malaka"
      },
      {
        province_id: 19,
        name: "Kota Kupang"
      }
    ]
  );
}

// Seed value Kalimantan Barat 20
function initCity20() {
  City.bulkCreate(
    [
      {
        province_id: 20,
        name: "Kabupaten Sambas"
      },
      {
        province_id: 20,
        name: "Kabupaten Bengkayang"
      },
      {
        province_id: 20,
        name: "Kabupaten Landak"
      },
      {
        province_id: 20,
        name: "Kabupaten Mempawah"
      },
      {
        province_id: 20,
        name: "Kabupaten Sanggau"
      },
      {
        province_id: 20,
        name: "Kabupaten Ketapang"
      },
      {
        province_id: 20,
        name: "Kabupaten Sintang"
      },
      {
        province_id: 20,
        name: "Kabupaten Kapuas Hulu"
      },
      {
        province_id: 20,
        name: "Kabupaten Sekadau"
      },
      {
        province_id: 20,
        name: "Kabupaten Melawi"
      },
      {
        province_id: 20,
        name: "Kabupaten Kayong Utara"
      },
      {
        province_id: 20,
        name: "Kabupaten Kubu Raya"
      },
      {
        province_id: 20,
        name: "Kota Pontianak"
      },
      {
        province_id: 20,
        name: "Kota Singkawang"
      }
    ]
  );
}

// Seed value Kalimantan Tengah 21
function initCity21() {
  City.bulkCreate(
    [
      {
        province_id: 21,
        name: "Kabupaten Kotawaringin Barat"
      },
      {
        province_id: 21,
        name: "Kabupaten Kotawaringin Timur"
      },
      {
        province_id: 21,
        name: "Kabupaten Kapuas"
      },
      {
        province_id: 21,
        name: "Kabupaten Barito Selatan"
      },
      {
        province_id: 21,
        name: "Kabupaten Barito Utara"
      },
      {
        province_id: 21,
        name: "Kabupaten Sukamara"
      },
      {
        province_id: 21,
        name: "Kabupaten Lamandau"
      },
      {
        province_id: 21,
        name: "Kabupaten Seruyan"
      },
      {
        province_id: 21,
        name: "Kabupaten Katingan"
      },
      {
        province_id: 21,
        name: "Kabupaten Pulang Pisau"
      },
      {
        province_id: 21,
        name: "Kabupaten Gunung Mas"
      },
      {
        province_id: 21,
        name: "Kabupaten Barito Timur"
      },
      {
        province_id: 21,
        name: "Kabupaten Murung Raya"
      },
      {
        province_id: 21,
        name: "Kota Palangka Raya"
      }
    ]
  );
}

// Seed value Kalimantan Selatan 22
function initCity22() {
  City.bulkCreate(
    [
      {
        province_id: 22,
        name: "Kabupaten Tanah Laut"
      },
      {
        province_id: 22,
        name: "Kabupaten Kota Baru"
      },
      {
        province_id: 22,
        name: "Kabupaten Banjar"
      },
      {
        province_id: 22,
        name: "Kabupaten Barito Kuala"
      },
      {
        province_id: 22,
        name: "Kabupaten Tapin"
      },
      {
        province_id: 22,
        name: "Kabupaten Hulu Sungai Selatan"
      },
      {
        province_id: 22,
        name: "Kabupaten Hulu Sungai Tengah"
      },
      {
        province_id: 22,
        name: "Kabupaten Hulu Sungai Utara"
      },
      {
        province_id: 22,
        name: "Kabupaten Tabalong"
      },
      {
        province_id: 22,
        name: "Kabupaten Tanah Bumbu"
      },
      {
        province_id: 22,
        name: "Kabupaten Balangan"
      },
      {
        province_id: 22,
        name: "Kota Banjarmasin"
      },
      {
        province_id: 22,
        name: "Kota Banjar Baru"
      }
    ]
  );
}

// Seed value Kalimantan Timur 23
function initCity23() {
  City.bulkCreate(
    [
      {
        province_id: 23,
        name: "Kabupaten Paser"
      },
      {
        province_id: 23,
        name: "Kabupaten Kutai Barat"
      },
      {
        province_id: 23,
        name: "Kabupaten Kutai Kartanegara"
      },
      {
        province_id: 23,
        name: "Kabupaten Kutai Timur"
      },
      {
        province_id: 23,
        name: "Kabupaten Berau"
      },
      {
        province_id: 23,
        name: "Kabupaten Penajam Paser Utara"
      },
      {
        province_id: 23,
        name: "Kabupaten Mahakam Hulu"
      },
      {
        province_id: 23,
        name: "Kota Balikpapan"
      },
      {
        province_id: 23,
        name: "Kota Samarinda"
      },
      {
        province_id: 23,
        name: "Kota Bontang"
      }
    ]
  );
}

// Seed value Kalimantan Utara 24
function initCity24() {
  City.bulkCreate(
    [
      {
        province_id: 24,
        name: "Kabupaten Malinau"
      },
      {
        province_id: 24,
        name: "Kabupaten Bulungan"
      },
      {
        province_id: 24,
        name: "Kabupaten Tana Tidung"
      },
      {
        province_id: 24,
        name: "Kabupaten Nunukan"
      },
      {
        province_id: 24,
        name: "Kota Tarakan"
      }
    ]
  );
}

// Seed value Sulawesi Utara 25
function initCity25() {
  City.bulkCreate(
    [
      {
        province_id: 25,
        name: "Kabupaten Bolaang Mongondow"
      },
      {
        province_id: 25,
        name: "Kabupaten Minahasa"
      },
      {
        province_id: 25,
        name: "Kabupaten Kepulauan Sangihe"
      },
      {
        province_id: 25,
        name: "Kabupaten Kepulauan Talaud"
      },
      {
        province_id: 25,
        name: "Kabupaten Minahasa Selatan"
      },
      {
        province_id: 25,
        name: "Kabupaten Minahasa Utara"
      },
      {
        province_id: 25,
        name: "Kabupaten Bolaang Mongondow Utara"
      },
      {
        province_id: 25,
        name: "Kabupaten Siau Tagulandang Biaro"
      },
      {
        province_id: 25,
        name: "Kabupaten Minahasa Tenggara"
      },
      {
        province_id: 25,
        name: "Kabupaten Bolaang Mongondow Selatan"
      },
      {
        province_id: 25,
        name: "Kabupaten Bolaang Mongondow Timur"
      },
      {
        province_id: 25,
        name: "Kota Manado"
      },
      {
        province_id: 25,
        name: "Kota Bitung"
      },
      {
        province_id: 25,
        name: "Kota Tomohon"
      },
      {
        province_id: 25,
        name: "Kota Kotamobagu"
      }
    ]
  );
}

// Seed value Sulawesi Tengah 26
function initCity26() {
  City.bulkCreate(
    [
      {
        province_id: 26,
        name: "Kabupaten Banggai Kepulauan"
      },
      {
        province_id: 26,
        name: "Kabupaten Banggai"
      },
      {
        province_id: 26,
        name: "Kabupaten Morowali"
      },
      {
        province_id: 26,
        name: "Kabupaten Poso"
      },
      {
        province_id: 26,
        name: "Kabupaten Donggala"
      },
      {
        province_id: 26,
        name: "Kabupaten Toli-toli"
      },
      {
        province_id: 26,
        name: "Kabupaten Buol"
      },
      {
        province_id: 26,
        name: "Kabupaten Parigi Moutong"
      },
      {
        province_id: 26,
        name: "Kabupaten Tojo Una-una"
      },
      {
        province_id: 26,
        name: "Kabupaten Sigi"
      },
      {
        province_id: 26,
        name: "Kabupaten Banggai Laut"
      },
      {
        province_id: 26,
        name: "Kabupaten Morowali Utara"
      },
      {
        province_id: 26,
        name: "Kota Palu"
      }
    ]
  );
}

// Seed value Sulawesi Selatan 27
function initCity27() {
  City.bulkCreate(
    [
      {
        province_id: 27,
        name: "Kabupaten Kepulauan Selayar"
      },
      {
        province_id: 27,
        name: "Kabupaten Bulukumba"
      },
      {
        province_id: 27,
        name: "Kabupaten Bantaeng"
      },
      {
        province_id: 27,
        name: "Kabupaten Jeneponto"
      },
      {
        province_id: 27,
        name: "Kabupaten Takalar"
      },
      {
        province_id: 27,
        name: "Kabupaten Gowa"
      },
      {
        province_id: 27,
        name: "Kabupaten Sinjai"
      },
      {
        province_id: 27,
        name: "Kabupaten Maros"
      },
      {
        province_id: 27,
        name: "Kabupaten Pangkajene Dan Kepulauan"
      },
      {
        province_id: 27,
        name: "Kabupaten Barru"
      },
      {
        province_id: 27,
        name: "Kabupaten Bone"
      },
      {
        province_id: 27,
        name: "Kabupaten Soppeng"
      },
      {
        province_id: 27,
        name: "Kabupaten Wajo"
      },
      {
        province_id: 27,
        name: "Kabupaten Sidenreng Rappang"
      },
      {
        province_id: 27,
        name: "Kabupaten Pinrang"
      },
      {
        province_id: 27,
        name: "Kabupaten Enrekang"
      },
      {
        province_id: 27,
        name: "Kabupaten Luwu"
      },
      {
        province_id: 27,
        name: "Kabupaten Tana Toraja"
      },
      {
        province_id: 27,
        name: "Kabupaten Luwu Utara"
      },
      {
        province_id: 27,
        name: "Kabupaten Luwu Timur"
      },
      {
        province_id: 27,
        name: "Kabupaten Toraja Utara"
      },
      {
        province_id: 27,
        name: "Kota Makassar"
      },
      {
        province_id: 27,
        name: "Kota Parepare"
      },
      {
        province_id: 27,
        name: "Kota Palopo"
      }
    ]
  );
}

// Seed value Sulawesi Tenggara 28
function initCity28() {
  City.bulkCreate(
    [
      {
        province_id: 28,
        name: "Kabupaten Buton"
      },
      {
        province_id: 28,
        name: "Kabupaten Muna"
      },
      {
        province_id: 28,
        name: "Kabupaten Konawe"
      },
      {
        province_id: 28,
        name: "Kabupaten Kolaka"
      },
      {
        province_id: 28,
        name: "Kabupaten Konawe Selatan"
      },
      {
        province_id: 28,
        name: "Kabupaten Bombana"
      },
      {
        province_id: 28,
        name: "Kabupaten Wakatobi"
      },
      {
        province_id: 28,
        name: "Kabupaten Kolaka Utara"
      },
      {
        province_id: 28,
        name: "Kabupaten Buton Utara"
      },
      {
        province_id: 28,
        name: "Kabupaten Konawe Utara"
      },
      {
        province_id: 28,
        name: "Kabupaten Kolaka Timur"
      },
      {
        province_id: 28,
        name: "Kabupaten Konawe Kepulauan"
      },
      {
        province_id: 28,
        name: "Kabupaten Muna Barat"
      },
      {
        province_id: 28,
        name: "Kabupaten Buton Tengah"
      },
      {
        province_id: 28,
        name: "Kabupaten Buton Selatan"
      },
      {
        province_id: 28,
        name: "Kota Kendari"
      },
      {
        province_id: 28,
        name: "Kota Baubau"
      }
    ]
  );
}

// Seed value Gorontalo 29
function initCity29() {
  City.bulkCreate(
    [
      {
        province_id: 29,
        name: "Kabupaten Boalemo"
      },
      {
        province_id: 29,
        name: "Kabupaten Gorontalo"
      },
      {
        province_id: 29,
        name: "Kabupaten Pohuwato"
      },
      {
        province_id: 29,
        name: "Kabupaten Bone Bolango"
      },
      {
        province_id: 29,
        name: "Kabupaten Gorontalo Utara"
      },
      {
        province_id: 29,
        name: "Kota Gorontalo"
      }
    ]
  );
}

// Seed value Sulawesi Barat 30
function initCity30() {
  City.bulkCreate(
    [
      {
        province_id: 30,
        name: "Kabupaten Majene"
      },
      {
        province_id: 30,
        name: "Kabupaten Polewali Mandar"
      },
      {
        province_id: 30,
        name: "Kabupaten Mamasa"
      },
      {
        province_id: 30,
        name: "Kabupaten Mamuju"
      },
      {
        province_id: 30,
        name: "Kabupaten Mamuju Utara"
      },
      {
        province_id: 30,
        name: "Kabupaten Mamuju Tengah"
      }
    ]
  );
}

// Seed value Maluku 31
function initCity31() {
  City.bulkCreate(
    [
      {
        province_id: 31,
        name: "Kabupaten Maluku Tenggara Barat"
      },
      {
        province_id: 31,
        name: "Kabupaten Maluku Tenggara"
      },
      {
        province_id: 31,
        name: "Kabupaten Maluku Tengah"
      },
      {
        province_id: 31,
        name: "Kabupaten Buru"
      },
      {
        province_id: 31,
        name: "Kabupaten Kepulauan Aru"
      },
      {
        province_id: 31,
        name: "Kabupaten Seram Bagian Barat"
      },
      {
        province_id: 31,
        name: "Kabupaten Seram Bagian Timur"
      },
      {
        province_id: 31,
        name: "Kabupaten Maluku Barat Daya"
      },
      {
        province_id: 31,
        name: "Kabupaten Buru Selatan"
      },
      {
        province_id: 31,
        name: "Kota Ambon"
      },
      {
        province_id: 31,
        name: "Kota Tual"
      }
    ]
  );
}

// Seed value Maluku Utara 32
function initCity32() {
  City.bulkCreate(
    [
      {
        province_id: 32,
        name: "Kabupaten Halmahera Barat"
      },
      {
        province_id: 32,
        name: "Kabupaten Halmahera Tengah"
      },
      {
        province_id: 32,
        name: "Kabupaten Kepulauan Sula"
      },
      {
        province_id: 32,
        name: "Kabupaten Halmahera Selatan"
      },
      {
        province_id: 32,
        name: "Kabupaten Halmahera Utara"
      },
      {
        province_id: 32,
        name: "Kabupaten Halmahera Timur"
      },
      {
        province_id: 32,
        name: "Kabupaten Pulau Morotai"
      },
      {
        province_id: 32,
        name: "Kabupaten Pulau Taliabu"
      },
      {
        province_id: 32,
        name: "Kota Ternate"
      },
      {
        province_id: 32,
        name: "Kota Tidore Kepulauan"
      }
    ]
  );
}

// Seed value Papua Barat 33
function initCity33() {
  City.bulkCreate(
    [
      {
        province_id: 33,
        name: "Kabupaten Fakfak"
      },
      {
        province_id: 33,
        name: "Kabupaten Kaimana"
      },
      {
        province_id: 33,
        name: "Kabupaten Teluk Wondama"
      },
      {
        province_id: 33,
        name: "Kabupaten Teluk Bintuni"
      },
      {
        province_id: 33,
        name: "Kabupaten Manokwari"
      },
      {
        province_id: 33,
        name: "Kabupaten Sorong Selatan"
      },
      {
        province_id: 33,
        name: "Kabupaten Sorong"
      },
      {
        province_id: 33,
        name: "Kabupaten Raja Ampat"
      },
      {
        province_id: 33,
        name: "Kabupaten Tambrauw"
      },
      {
        province_id: 33,
        name: "Kabupaten Maybrat"
      },
      {
        province_id: 33,
        name: "Kabupaten Manokwari Selatan"
      },
      {
        province_id: 33,
        name: "Kabupaten Pegunungan Arfak"
      },
      {
        province_id: 33,
        name: "Kota Sorong"
      }
    ]
  );
}

// Seed value Papua 34
function initCity34() {
  City.bulkCreate(
    [
      {
        province_id: 34,
        name: "Kabupaten Merauke"
      },
      {
        province_id: 34,
        name: "Kabupaten Jayawijaya"
      },
      {
        province_id: 34,
        name: "Kabupaten Jayapura"
      },
      {
        province_id: 34,
        name: "Kabupaten Nabire"
      },
      {
        province_id: 34,
        name: "Kabupaten Kepulauan Yapen"
      },
      {
        province_id: 34,
        name: "Kabupaten Biak Numfor"
      },
      {
        province_id: 34,
        name: "Kabupaten Paniai"
      },
      {
        province_id: 34,
        name: "Kabupaten Puncak Jaya"
      },
      {
        province_id: 34,
        name: "Kabupaten Mimika"
      },
      {
        province_id: 34,
        name: "Kabupaten Boven Digoel"
      },
      {
        province_id: 34,
        name: "Kabupaten Mappi"
      },
      {
        province_id: 34,
        name: "Kabupaten Asmat"
      },
      {
        province_id: 34,
        name: "Kabupaten Yahukimo"
      },
      {
        province_id: 34,
        name: "Kabupaten Pegunungan Bintang"
      },
      {
        province_id: 34,
        name: "Kabupaten Tolikara"
      },
      {
        province_id: 34,
        name: "Kabupaten Sarmi"
      },
      {
        province_id: 34,
        name: "Kabupaten Keerom"
      },
      {
        province_id: 34,
        name: "Kabupaten Waropen"
      },
      {
        province_id: 34,
        name: "Kabupaten Supiori"
      },
      {
        province_id: 34,
        name: "Kabupaten Mamberamo Raya"
      },
      {
        province_id: 34,
        name: "Kabupaten Nduga"
      },
      {
        province_id: 34,
        name: "Kabupaten Lanny Jaya"
      },
      {
        province_id: 34,
        name: "Kabupaten Mamberamo Tengah"
      },
      {
        province_id: 34,
        name: "Kabupaten Yalimo"
      },
      {
        province_id: 34,
        name: "Kabupaten Puncak"
      },
      {
        province_id: 34,
        name: "Kabupaten Dogiyai"
      },
      {
        province_id: 34,
        name: "Kabupaten Intan Jaya"
      },
      {
        province_id: 34,
        name: "Kabupaten Deiyai"
      },
      {
        province_id: 34,
        name: "Kota Jayapura"
      }
    ]
  );
}