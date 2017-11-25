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

  applicants.sync()

  const employers = sequelize.define('employers', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  employers.sync()

  const adverts = sequelize.define('adverts', {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  adverts.sync()

  const applications = sequelize.define('applications', {
    fullcontent: {
      type: Sequelize.STRING,
      allowNull: false
    },
    summary: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })

  applications.sync()

  const resumes = sequelize.define('resumes', {
    education: {
      type: Sequelize.STRING,
      allowNull: true
    },
    company: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  resumes.sync()

  const savedApplications = sequelize.define('savedApplications')

  savedApplications.sync()

  const titles = sequelize.define('titles', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  titles.sync()

  const resumesToTitles = sequelize.define('resumesToTitles')

  resumesToTitles.sync()

  const skills = sequelize.define('skills', {
    skill: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  skills.sync()

  const titlesToSkills = sequelize.define('titlesToSkills')

  titlesToSkills.sync()

  employers.hasMany(adverts)
  applicants.hasMany(applications)
  applicants.hasOne(resumes)
  applications.hasOne(adverts)
  employers.belongsToMany(applications, { through: savedApplications })
  titles.belongsToMany(resumes, { through: resumesToTitles })
  skills.belongsToMany(titles, { through: titlesToSkills })

  sequelize.sync()

  return {
    applicants,
    applications,
    resumes,
    employers,
    skills,
    titles,
    adverts,
    savedApplications
  }
}
