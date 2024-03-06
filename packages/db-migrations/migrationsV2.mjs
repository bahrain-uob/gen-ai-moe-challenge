// Insert data for parking areas
export async function up(db) {
await db
  .insertInto('parking_area')
  .values([
    {
      area_id: 1,
      area_name: 'Manama',
      latitude: '26.2285',
      longitude: '50.5860',
      created_at: new Date(),
    },
    {
      area_id: 2,
      area_name: 'Muharraq',
      latitude: '26.2622',
      longitude: '50.6091',
      created_at: new Date(),
    },
    {
      area_id: 3,
      area_name: 'Isa Town',
      latitude: '26.1404',
      longitude: '50.6120',
      created_at: new Date(),
    },
    {
      area_id: 4,
      area_name: 'Riffa',
      latitude: '26.1346',
      longitude: '50.6096',
      created_at: new Date(),
    }
  ])
  .execute();

// Insert data for devices
await db
  .insertInto('device')
  .values([
    {
      device_id: 1,
      created_at: new Date(),
      is_healthy: true,
    },
    {
      device_id: 2,
      created_at: new Date(),
      is_healthy: true,
    },
    {
      device_id: 3,
      created_at: new Date(),
      is_healthy: true,
    },
    {
      device_id: 4,
      created_at: new Date(),
      is_healthy: true,
    },
    {
      device_id: 5,
      created_at: new Date(),
      is_healthy: true,
    }
  ])
  .execute();

// Insert data for users
await db
  .insertInto('user')
  .values([
    {
      user_id: 1,
      full_name: 'John Doe',
      phone_number: '555-123-4567',
      balance: 100.00,
      created_at: new Date(),
    },
    {
      user_id: 2,
      full_name: 'Jane Smith',
      phone_number: '555-234-5678',
      balance: 75.50,
      created_at: new Date(),
    },
    {
      user_id: 3,
      full_name: 'Michael Johnson',
      phone_number: '555-345-6789',
      balance: 50.25,
      created_at: new Date(),
    },
    {
      user_id: 4,
      full_name: 'Emily Wilson',
      phone_number: '555-456-7890',
      balance: 125.00,
      created_at: new Date(),
    },
    {
      user_id: 5,
      full_name: 'David Brown',
      phone_number: '555-567-8901',
      balance: 80.75,
      created_at: new Date(),
    },
    {
      user_id: 6,
      full_name: 'Sarah Taylor',
      phone_number: '555-678-9012',
      balance: 60.20,
      created_at: new Date(),
    },
    {
      user_id: 7,
      full_name: 'Robert Evans',
      phone_number: '555-789-0123',
      balance: 95.60,
      created_at: new Date(),
    },
    {
      user_id: 8,
      full_name: 'Olivia Anderson',
      phone_number: '555-890-1234',
      balance: 110.00,
      created_at: new Date(),
    },
    {
      user_id: 9,
      full_name: 'William Harris',
      phone_number: '555-901-2345',
      balance: 70.90,
      created_at: new Date(),
    },
    {
      user_id: 10,
      full_name: 'Ava Martinez',
      phone_number: '555-012-3456',
      balance: 85.30,
      created_at: new Date(),
    }
  ])
  .execute();

// Insert data for vehicles
await db
  .insertInto('vehicle')
  .values([
    {
      license_plate: 'ABC123',
      user_id: 1,
      vehicle_nickname: 'John\'s Car',
      vehicle_make: 'Toyota',
      vehicle_model: 'Camry',
      year: 2019,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'DEF456',
      user_id: 2,
      vehicle_nickname: 'Jane\'s Car',
      vehicle_make: 'Honda',
      vehicle_model: 'Civic',
      year: 2020,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'GHI789',
      user_id: 3,
      vehicle_nickname: 'Michael\'s Car',
      vehicle_make: 'Ford',
      vehicle_model: 'Focus',
      year: 2018,
      vehicle_type: 'Hatchback',
      status: 'Parked',
    },
    {
      license_plate: 'JKL012',
      user_id: 4,
      vehicle_nickname: 'Emily\'s Car',
      vehicle_make: 'Chevrolet',
      vehicle_model: 'Malibu',
      year: 2017,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'MNO345',
      user_id: 5,
      vehicle_nickname: 'David\'s Car',
      vehicle_make: 'Nissan',
      vehicle_model: 'Altima',
      year: 2019,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'PQR678',
      user_id: 6,
      vehicle_nickname: 'Sarah\'s Car',
      vehicle_make: 'Hyundai',
      vehicle_model: 'Elantra',
      year: 2020,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'STU901',
      user_id: 7,
      vehicle_nickname: 'Robert\'s Car',
      vehicle_make: 'Kia',
      vehicle_model: 'Forte',
      year: 2017,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'VWX234',
      user_id: 8,
      vehicle_nickname: 'Olivia\'s Car',
      vehicle_make: 'Volkswagen',
      vehicle_model: 'Jetta',
      year: 2018,
      vehicle_type: 'Sedan',
      status: 'Parked',
    },
    {
      license_plate: 'YZA567',
      user_id: 9,
      vehicle_nickname: 'William\'s Car',
      vehicle_make: 'Mazda',
      vehicle_model: '3',
      year: 2016,
      vehicle_type: 'Hatchback',
      status: 'Parked',
    },
    {
      license_plate: 'BCD890',
      user_id: 10,
      vehicle_nickname: 'Ava\'s Car',
      vehicle_make: 'Subaru',
      vehicle_model: 'Impreza',
      year: 2021,
      vehicle_type: 'Sedan',
      status: 'Parked',
    }
  ])
  .execute();

// Insert data for parked vehicles in the 'park' table
await db
  .insertInto('park')
  .values([
    {
      park_id: 1,
      area_id: 1,
      device_id: 1,
      latitude: '26.2285',
      longitude: '50.5860',
      is_available: true,
    },
    {
      park_id: 2,
      area_id: 2,
      device_id: 2,
      latitude: '26.2622',
      longitude: '50.6091',
      is_available: true,
    },
    {
      park_id: 3,
      area_id: 3,
      device_id: 3,
      latitude: '26.1404',
      longitude: '50.6120',
      is_available: true,
    },
    {
      park_id: 4,
      area_id: 4,
      device_id: 4,
      latitude: '26.1346',
      longitude: '50.6096',
      is_available: true,
    },
    {
      park_id: 5,
      area_id: 1,
      device_id: 5,
      latitude: '26.2285',
      longitude: '50.5860',
      is_available: true,
    }
  ])
  .execute();

// Insert data for parking tickets (open/unpaid) for the parked vehicles
await db
  .insertInto('ticket')
  .values([
    {
      ticket_id: 1,
      license_plate: 'ABC123',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 1,
      user_id: 1,
    },
    {
      ticket_id: 2,
      license_plate: 'DEF456',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 2,
      user_id: 2,
    },
    {
      ticket_id: 3,
      license_plate: 'GHI789',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 3,
      user_id: 3,
    },
    {
      ticket_id: 4,
      license_plate: 'JKL012',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 4,
      user_id: 4,
    },
    {
      ticket_id: 5,
      license_plate: 'MNO345',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 1,
      user_id: 5,
    },
    {
      ticket_id: 6,
      license_plate: 'PQR678',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 2,
      user_id: 6,
    },
    {
      ticket_id: 7,
      license_plate: 'STU901',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 3,
      user_id: 7,
    },
    {
      ticket_id: 8,
      license_plate: 'VWX234',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 4,
      user_id: 8,
    },
    {
      ticket_id: 9,
      license_plate: 'YZA567',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 5,
      user_id: 9,
    },
    {
      ticket_id: 10,
      license_plate: 'BCD890',
      status: 'Open',
      entry_time: new Date(),
      exit_time: null,
      park_id: 1,
      user_id: 10,
    }
  ])
  .execute();

// Insert data for paid tickets
await db
  .insertInto('payment')
  .values([
    {
      payment_id: 1,
      ticket_id: 1,
      amount: 10.00,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    },
    {
      payment_id: 2,
      ticket_id: 2,
      amount: 7.50,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    },
    {
      payment_id: 3,
      ticket_id: 3,
      amount: 5.00,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Cash',
    },
    {
      payment_id: 4,
      ticket_id: 4,
      amount: 12.50,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    },
    {
      payment_id: 5,
      ticket_id: 5,
      amount: 8.00,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    },
    {
      payment_id: 6,
      ticket_id: 6,
      amount: 6.20,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Cash',
    },
    {
      payment_id: 7,
      ticket_id: 7,
      amount: 9.60,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    },
    {
      payment_id: 8,
      ticket_id: 8,
      amount: 11.00,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    },
    {
      payment_id: 9,
      ticket_id: 9,
      amount: 7.09,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Cash',
    },
    {
      payment_id: 10,
      ticket_id: 10,
      amount: 8.53,
      payment_date: new Date(),
      status: 'Paid',
      payment_type: 'Credit Card',
    }
  ])
  .execute();


  await db
  .insertInto('health_check')
  .values([
    {
      check_id: 1,
      device_id: 1,
      camera_status: 1,
      temperature: 35,
      sensor_status: 1,
      check_date : new Date(),
      result: ''
    },
    {
      check_id: 2,
      device_id: 2,
      camera_status: 0,
      temperature: 25,
      sensor_status: 1,
      check_date : new Date(),
      result: ''
    },
  ])
  .execute();

}
