const Sequelize = require('sequelize')

module.exports = sequelize => {
  const applications = sequelize.define('applications', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  applications.sync()

  return { applications }
}
