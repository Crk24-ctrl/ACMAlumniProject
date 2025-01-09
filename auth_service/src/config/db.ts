import { Sequelize, Model, DataTypes } from "sequelize";
import { UnverifiedT, UserT } from "../types";
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    port: Number(process.env.DB_PORT as string),
    logging: false,
  }
);

class User extends Model implements UserT {
  declare uuid: string;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare username: string;
  declare password: string;
}

User.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize,
    modelName: "User",
  }
);

class Unverified extends Model implements UnverifiedT {
  declare uuid: string;
  declare code: string;
  declare password: string;
  declare email: string;
  declare first_name: string;
  declare last_name: string;
}

Unverified.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "unverified_users",
    sequelize,
    modelName: "Unverified",
  }
);

export default async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "[DATABASE CONNECTED] Connection has been established successfully."
    );
    // await sequelize.sync({ alter: true });
    // console.log("Check the workbench");
  } catch (error: any) {
    console.error(
      "[DATABASE CONNECTION ERROR] Unable to connect to the database.",
      error.message
    );
    process.exit(1);
  }
};

export { User, Unverified };
