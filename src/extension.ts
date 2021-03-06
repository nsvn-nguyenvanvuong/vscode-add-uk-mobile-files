import { ExtensionContext, commands, window } from 'vscode';
import { dialog, createViewFiles, createDocumentFiles } from './file-managers';

import { mkdir, openEditor } from './utils';

export function activate(context: ExtensionContext) {
  const err = window.showErrorMessage;
  const cmd = commands.executeCommand;
  const reg = commands.registerCommand;
  const msg = window.showInformationMessage;

  const view = reg('extension.addUKFiles', (args) => {
    dialog(args, 'a')
      .then(mkdir)
      .then(createViewFiles)
      .then(openEditor)
      .then(() => {
        msg('UK: Component was created!');
        cmd("workbench.files.action.refreshFilesExplorer");
      })
      .catch(err);
  });
  const docs = reg('extension.addUKDocument', (args) => {
    dialog(args, 'docs')
      .then(mkdir)
      .then(createDocumentFiles)
      .then(openEditor)
      .then(() => {
        msg('UK: Document was created!');
        cmd("workbench.files.action.refreshFilesExplorer");
      })
      .catch(err);
  });

  context.subscriptions.push(view);
  context.subscriptions.push(docs);
}
