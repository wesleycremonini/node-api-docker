const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize(
	process.env.MYSQLDB_DATABASE,
	process.env.MYSQLDB_USER,
	process.env.MYSQLDB_ROOT_PASSWORD,
	{
		dialect: 'mysql',
		host: 'db',
		port: '3306',
	}
)

class Product extends Model {}

Product.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT.UNSIGNED,
			allowNull: false,
		},
		featured: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		rating: {
			type: DataTypes.FLOAT.UNSIGNED,
			defaultValue: 4.5,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		company: {
			type: DataTypes.STRING(7),
			values: ['ikea', 'liddy', 'caressa', 'marcos'],
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: 'Product',
		tableName: 'products',
	}
)

module.exports = Product
