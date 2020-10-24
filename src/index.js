const { exec } = require('child_process');

export const fn = ({ term, display }) => {
  let match = term.match(new RegExp(/^sw\s*(.*)/, 'i'));

  if (match) {
    exec(
      `osascript -e "tell application \\"System Events\\" to get the name of every process whose background only is false"`,
      (err, stdout, stderr) => {
        if (err) console.log(err);
        stdout
          .split(',')
          .filter(
            (app) => app.toLowerCase().indexOf(match[1].toLowerCase()) > -1
          )
          .map((app) => {
            display({
              title: app,
              icon: `/Applications/${app.trim()}.app`,
              onSelect: () => {
                let cmd = `osascript -e "tell application \\"${app.trim()}\\" to activate"`;
                exec(cmd);
              },
            });
          });
      }
    );
  }
};

