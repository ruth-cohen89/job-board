import { Job } from './db.js'
import { Company } from './db.js'


function rejectIf(condition) {
    if (condition) {
        throw new Error('Unauthorized')
    }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const resolvers = {
    Query: {
        job: (_root, { id }) => {
            return Job.findById(id)
        },
        company: (_root, { id }) => {
            return Company.findById(id)
        },
        jobs: () => Job.findAll(),
        companies: () => Company.findAll()
      },

    Mutation: {
        createJob: async (_root, { input }, { user }) => {
            rejectIf(!user)
            await delay(2000);
            return Job.create({...input, companyId: user.companyId })
        },

        deleteJob: async (_root, { id }, { user }) => {
            rejectIf(!user)   
            
            const job = await Job.findById(id)

            rejectIf(user.companyId !== job.companyId)
             return Job.delete(id)
        },

        updateJob: async (_root, { input }, { user }) => {
            rejectIf(!user)   
            const job = await Job.findById(input.id)

            rejectIf(user.companyId !== job.companyId)
            return Job.update({...input, companyId: user.companyId })
        }
    },

    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id),
    },

    Job: {
        company: (job) => Company.findById(job.companyId),     
    },

};

