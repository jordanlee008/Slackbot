# SLACKBOT
This uses the official `slack` RTM and Web API.
I am using this in favor of the Node.js version, because this will be updated more frequently and does not require a webserver to run.
Do note that this cannot handle `/slash` commands and relies on doing logic in Python, rather than being handled by the packages.

## USAGE
You can use
```
pip install -r requirements.txt
```
to ensure all packages are downloaded.

YOU MUST BE USING PYTHON 3, THE NEW SLACK PACKAGE ISN'T SUPPORT ON PYTHON 2.

Then, the `.env` file must be populated with the Slack Bot User OAuth Access Token like so:
```
API_KEY=xoxb-*****-*****-*****
```
Then, to run use
```
python slackbot.py
```

## TODO
- Add JIRA functionality? [jira-python](https://jira.readthedocs.io/en/master/index.html)
- Add GitLab functionality? [python-gitlab](https://python-gitlab.readthedocs.io/en/stable/)
- Add Jenkins functionality? [python-jenkins is not yet stable](https://python-jenkins.readthedocs.io/en/latest/index.html)
