import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  chain,
  mergeWith,
  move,
  template,
  url
} from '@angular-devkit/schematics';
import { Path, join, normalize } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson } from './../utils/package';
import { addModuleImportToRootModule } from './../utils/ast';
import { addStyle, getWorkspace } from './../utils/config';
import { Schema as IonAddOptions } from './schema';

function addIonicAngularToPackageJson(): Rule {
  return (host: Tree) => {
    addPackageToPackageJson(host, 'dependencies', '@ionic/angular', 'latest');
    return host;
  };
}

function addIonicAngularModuleToAppModule(): Rule {
  return (host: Tree) => {
    addModuleImportToRootModule(
      host,
      'IonicModule.forRoot()',
      '@ionic/angular'
    );
    return host;
  };
}

function addIonicStyles(): Rule {
  return (host: Tree) => {
    addStyle(host, 'src/theme/variables.scss');
    addStyle(host, 'src/global.scss');
    return host;
  };
}

function installNodeDeps() {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
  };
}

export default function ngAdd(options: IonAddOptions): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    if (project.projectType !== 'application') {
      throw new SchematicsException(
        `Ionic Add requires a project type of "application".`
      );
    }

    const sourcePath = join(project.root as Path, 'src');
    const rootTemplateSource = apply(url('./files/root'), [
      template({ ...options }),
      move(sourcePath)
    ]);
    return chain([
      // @ionic/angular
      addIonicAngularToPackageJson(),
      addIonicAngularModuleToAppModule(),
      addIonicStyles(),
      mergeWith(rootTemplateSource),
      // install freshly added dependencies
      installNodeDeps()
    ]);
  };
}
