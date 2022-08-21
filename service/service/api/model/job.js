module.exports = function (sequelize, DataTypes) {
    return sequelize.define("fcm_job", {
        identifier: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        deliverAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false
    })
}