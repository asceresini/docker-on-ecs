import path from 'path'
import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'
import existsInList from '../../../exists-in-list'

const COMMAND_NAME = 'DeleteRepository'

export default (program, ecr, options) => {
  program
    .command('aws:ecr:delete <repositoryName>')
    .description('Delete the specified repository.')
    .action(repositoryName => {
      if(existsInList(repositoryName, options.LOCALLY_DEFINED_APPS)) {
        AwsCredentials();
        const params = { repositoryName }

        ecr
          .deleteRepository(params)
          .then(data => {
            Logger.info(COMMAND_NAME, data)
          })
          .catch(e => {
            Logger.error(COMMAND_NAME, e)
            process.exit(1)
          })
      } else {
        Logger.error(COMMAND_NAME, 'Please provide a valid repository name.')
        process.exit(1)
      }
    });
}
