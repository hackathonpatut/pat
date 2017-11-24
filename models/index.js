const Sequelize = require('sequelize')

module.exports = sequelize => {
  const applicants = sequelize.define('applicants', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  applicants.sync({ force: true })

  const employers = sequelize.define('employers', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })

  employers.sync({ force: true })

  const adverts = sequelize.define('adverts', {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })

  adverts.sync({ force: true })

  const applications = sequelize.define('applications', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    summary: {
      type: Sequelize.STRING,
      allowNull: false
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  applications.sync({ force: true })

  const resumes = sequelize.define('resumes', {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    summary: {
      type: Sequelize.STRING,
      allowNull: false
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  resumes.sync({ force: true })

  const savedApplications = sequelize.define('savedApplications')

  savedApplications.sync({ force: true })

  employers.hasMany(adverts)
  applicants.hasMany(applications)
  applicants.hasOne(resumes)
  applications.hasOne(adverts)
  employers.belongsToMany(applications, { through: savedApplications });

  sequelize.sync({ force: true })

  return { applicants, applications, resumes, employers, adverts, savedApplications }
}
