import * as vscode from "vscode";
import * as path from "path";

const surroundSep = (str: string): string => {
  return path.sep + str + path.sep;
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "component-jumper" is now active!');

  const disposable = vscode.commands.registerCommand("extension.componentJumper", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
      return;
    }

    const currentPath = editor.document.uri.fsPath;
    let targetPath;
    if (currentPath.includes(surroundSep("components"))) {
      targetPath = currentPath.replace(surroundSep("components"), surroundSep("containers"));
    } else if (currentPath.includes(surroundSep("containers"))) {
      targetPath = currentPath.replace(surroundSep("containers"), surroundSep("components"));
    } else {
      vscode.window.showInformationMessage("Please use for React component files.");
      return;
    }

    vscode.workspace.openTextDocument(targetPath).then(
      doc => {
        vscode.window.showTextDocument(doc);
      },
      error => {
        vscode.window.showInformationMessage(error);
      }
    );
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
