import {
  Rule,
  SchematicContext,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson } from './../utils/package';
import { addModuleImportToRootModule } from './../utils/ast';
// import {addStyle} from './../utils/config';

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

// function addBootstrapCSS(): Rule {
//   return (host: Tree) => {
//     addStyle(host, './node_modules/bootstrap/dist/css/bootstrap.css');
//     return host;
//   };
// }

function installNodeDeps() {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
  };
}

export default function ngAdd(): Rule {
  return chain([
    // @ionic/angular
    addIonicAngularToPackageJson(),
    addIonicAngularModuleToAppModule(),

    // addBootstrapCSS(),

    // install freshly added dependencies
    installNodeDeps()
  ]);
}
