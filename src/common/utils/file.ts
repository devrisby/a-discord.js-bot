import path, { sep } from 'path'
import fs from 'fs'
import configs from '../configs'

// src: https://antfu.me/posts/isomorphic-dirname
//   - throws typescript error
// const _dirname = typeof __dirname !== 'undefined'
//   ? __dirname
//   : dirname(fileURLToPath(import.meta.url))

const _dirname = __dirname

const getRootDirectoryPath = (): string => {
  const findSrcDirectoryPath = (srcName: string): string => {
    // src: https://github.com/nodejs/node/issues/28114
    const currentFilePath = _dirname
    const currentFilePathSplit = currentFilePath.split(sep)
    const backendSrcDirIndex = currentFilePathSplit.lastIndexOf(srcName) // get index of src directory
    const backendDirs = currentFilePathSplit.slice(0, backendSrcDirIndex + 1) // get array of paths to backend directory

    return backendDirs.join(sep) // join and return path to backend directory
  }

  return configs.ENV !== 'prod'
    ? findSrcDirectoryPath('src')
    : findSrcDirectoryPath('build')
}

const getFiles = (directoryName: string, ignoreFileName?: string): string[] => {
  const directoryPath = path.join(getRootDirectoryPath(), directoryName)
  const ignoreFile =
    ignoreFileName === undefined
      ? undefined
      : configs.ENV === 'prod'
      ? ignoreFileName + '.js'
      : ignoreFileName + '.ts'

  const filterAllFilePathsInsideDirectory = (fileName: string): boolean =>
    fileName.endsWith('.ts')
  const filterAllFilePathsInsideDirectoryExceptForIgnorePattern = (
    fileName: string
  ): boolean =>
    fileName.endsWith(configs.ENV === 'prod' ? '.js' : '.ts') &&
    fileName !== ignoreFile
  const createAbsoluteFilePath = (fileName: string): string =>
    getPath(directoryPath, fileName)

  return ignoreFile !== undefined
    ? fs
        .readdirSync(directoryPath)
        .filter(filterAllFilePathsInsideDirectoryExceptForIgnorePattern)
        .map(createAbsoluteFilePath)
    : fs
        .readdirSync(directoryPath)
        .filter(filterAllFilePathsInsideDirectory)
        .map(createAbsoluteFilePath)
}

const getPath = (...dirNames: string[]): string => path.join(...dirNames)

export default {
  getRootDirectoryPath,
  getFiles,
  getPath,
}
