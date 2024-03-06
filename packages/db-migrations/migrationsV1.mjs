import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("user")
    .addColumn("user_id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("full_name", "varchar(255)", (col) => col.notNull())
    .addColumn("phone_number", "varchar(255)")
    .addColumn("balance", "decimal")
    .addColumn("created_at", "timestamp")
    .execute();

  await db.schema
    .createTable("vehicle")
    .addColumn("license_plate", "varchar(255)", (col) => col.primaryKey())
    .addColumn("user_id", "integer")
    .addColumn("vehicle_nickname", "varchar(255)")
    .addColumn("vehicle_make", "varchar(255)")
    .addColumn("vehicle_model", "varchar(255)")
    .addColumn("year", "integer")
    .addColumn("vehicle_type", "varchar(255)")
    .addColumn("status", "varchar(255)")
    .execute();

  await db.schema
    .createTable("authorized_drivers")
    .addColumn("driver_id", "integer", (col) => col.primaryKey())
    .addColumn("user_id", "integer")
    .addColumn("license_plate", "varchar(255)")
    .execute();

  await db.schema
    .createTable("parking_area")
    .addColumn("area_id", "integer", (col) => col.primaryKey())
    .addColumn("area_name", "varchar(255)")
    .addColumn("latitude", "varchar(255)")
    .addColumn("longitude", "varchar(255)")
    .addColumn("created_at", "timestamp")
    .execute();

  await db.schema
    .createTable("device")
    .addColumn("device_id", "integer", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp")
    .addColumn("is_healthy", "boolean")
    .execute();

  await db.schema
    .createTable("health_check")
    .addColumn("check_id", "integer", (col) => col.primaryKey())
    .addColumn("device_id", "integer")
    .addColumn("camera_status", "boolean")
    .addColumn("temperature", "decimal")
    .addColumn("sensor_status", "boolean")
    .addColumn("check_date", "timestamp")
    .addColumn("result", "varchar(255)")
    .execute();

  await db.schema
    .createTable("media")
    .addColumn("media_id", "integer", (col) => col.primaryKey())
    .addColumn("media_type", "varchar(255)")
    .addColumn("file_path", "varchar(255)")
    .addColumn("created_at", "timestamp")
    .addColumn("device_id", "integer")
    .execute();

  await db.schema
    .createTable("ticket")
    .addColumn("ticket_id", "integer", (col) => col.primaryKey())
    .addColumn("license_plate", "varchar(255)")
    .addColumn("status", "varchar(255)")
    .addColumn("entry_time", "timestamp")
    .addColumn("exit_time", "timestamp")
    .addColumn("park_id", "integer")
    .addColumn("user_id", "integer")
    .execute();

  await db.schema
    .createTable("payment")
    .addColumn("payment_id", "integer", (col) => col.primaryKey())
    .addColumn("ticket_id", "integer")
    .addColumn("amount", "decimal")
    .addColumn("payment_date", "timestamp")
    .addColumn("status", "varchar(255)")
    .addColumn("payment_type", "varchar(255)")
    .execute();

  await db.schema
    .createTable("park")
    .addColumn("park_id", "integer", (col) => col.primaryKey())
    .addColumn("area_id", "integer")
    .addColumn("device_id", "integer")
    .addColumn("latitude", "varchar(255)")
    .addColumn("longitude", "varchar(255)")
    .addColumn("is_available", "boolean")
    .execute();

  await db.schema
    .createTable("violations")
    .addColumn("violation_id", "integer", (col) => col.primaryKey())
    .addColumn("user_id", "integer")
    .addColumn("violation_type_id", "integer")
    .addColumn("violation_date", "timestamp")
    .addColumn("description", "text")
    .addColumn("violations_type", "varchar(255)")
    .addColumn("violation_status", "varchar(255)")
    .addColumn("ticket_id", "integer")
    .execute();

  // Add foreign keys
  await db.schema
    .alterTable("vehicle")
    .addForeignKeyConstraint(
      'user_vehicle_fk',
      ['user_id'],
      'user',
      ['user_id'])
    .execute();

  await db.schema
    .alterTable("authorized_drivers")
    .addForeignKeyConstraint(
      "authorized_drivers_vehicle_fk",
      ["license_plate"],
      'vehicle',
      ['license_plate']
    )
    .execute();
  await db.schema
    .alterTable("authorized_drivers")
    .addForeignKeyConstraint(
      "authorized_drivers_user_fk",
      ["user_id"],
      'user',
      ['user_id']
    )
    .execute();

  await db.schema
    .alterTable("ticket")
    .addForeignKeyConstraint(
      "ticket_vehicle_fk",
      ["license_plate"],
      'vehicle',
      ['license_plate']
    )
    .execute();
  await db.schema
    .alterTable("ticket")
    .addForeignKeyConstraint(
      "ticket_user_fk",
      ["user_id"],
      'user',
      ['user_id']
    )
    .execute();
  await db.schema
    .alterTable("ticket")
    .addForeignKeyConstraint(
      "ticket_park_fk",
      ["park_id"],
      'park',
      ['park_id']
    )
    .execute();

  await db.schema
    .alterTable("payment")
    .addForeignKeyConstraint(
      "payment_ticket_fk",
      ["ticket_id"],
      'ticket',
      ['ticket_id']
    )
    .execute();

  await db.schema
    .alterTable("violations")
    .addForeignKeyConstraint(
      "violations_ticket_fk",
      ["ticket_id"],
      'ticket',
      ['ticket_id']
    )
    .execute();

  await db.schema
    .alterTable("park")
    .addForeignKeyConstraint(
      "park_area_fk",
      ["area_id"],
      'parking_area',
      ['area_id']
    )
    .execute();
  await db.schema
    .alterTable("park")
    .addForeignKeyConstraint(
      "park_device_fk",
      ["device_id"],
      'device',
      ['device_id']
    )
    .execute();

  await db.schema
    .alterTable("health_check")
    .addForeignKeyConstraint(
      "health_check_device_fk",
      ["device_id"],
      'device',
      ['device_id']
    )
    .execute();

  await db.schema
    .alterTable("media")
    .addForeignKeyConstraint(
      "media_device_fk",
      ["device_id"],
      'device',
      ['device_id']
    )
    .execute();

}



/**
 * @param db {Kysely<any>}
 */

export async function down(db) {

  //ORDER IS IMPORTANT
  await db.schema.dropTable("media").execute();
  await db.schema.dropTable("health_check").execute();
  await db.schema.dropTable("violations").execute();
  await db.schema.dropTable("payment").execute();
  await db.schema.dropTable("ticket").execute();
  await db.schema.dropTable("park").execute();
  await db.schema.dropTable("parking_area").execute();
  await db.schema.dropTable("device").execute();
  await db.schema.dropTable("authorized_drivers").execute();
  await db.schema.dropTable("vehicle").execute();
  await db.schema.dropTable("user").execute();
}
