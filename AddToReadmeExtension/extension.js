const vscode = require('vscode')
const CreateFileAddReadMe = require('./CreateFileAddReadMe')

function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.addToReadme', async () => {

    const question = await vscode.window.showInputBox({
      placeHolder: "This will be folder name",
      prompt: "Enter Question Title"
    })
    if(question.trim()) {
      const solution = await vscode.window.showInputBox({
        placeHolder: "This will be file name",
        prompt: "Enter Solution Function Name"
      })
      if(solution.trim()) {
        const content = vscode.window.activeTextEditor.document.getText()
        const folder = vscode.workspace.rootPath
        try {
          await CreateFileAddReadMe(question, solution, content, folder)
          vscode.window.showInformationMessage("File Created and Added to ReadMe Table")
        } catch (error) {
          vscode.window.showWarningMessage(error.message)
        }
      }
    }
	})

	context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
