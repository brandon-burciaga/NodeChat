## NodeChat

Real time chat application built using Node.js, Socket.io, and Express.js

#### Running NodeChat

First, please make sure you have [npm](https://docs.npmjs.com/getting-started/installing-node) installed correctly before running the below commands.

With npm installed, clone the NodeChat repository into an empty directory:

	git clone https://github.com/bmb0205/NodeChat.git TargetDirectory/

cd into TargetDirectory/, then run:

	npm install

After node_modules are installed locally, run:

    node app.js

Check out [ngrok](https://www.ngrok.com) if you want to create a secure public URL to a local webserver on your machine so you can chat with friends.

!TODO!: Auto-scroll message container to bottom

	NodeChat
		|--public/
		|	|
		|	|--css/
		|	|	|--style.css
		|	|
		|	|--app.js
		|	|--index.html
		|	|--main.js
		|
		|--package.json
		|--README.md
		|--.gitignore

