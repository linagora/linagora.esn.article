![Archived](https://img.shields.io/badge/Current_Status-archived-blue?style=flat)

# linagora.esn.article

Article component for OpenPaaS ESN.

## Install

**1. Clone linagora.esn.article

    git clone https://ci.open-paas.org/stash/scm/om/linagora.esn.article.git

Go inside linagora.esn.rse repo and run:

    npm install
    npm link

Go inside linagora.esn.article and run:

    npm link linagora-rse
    npm install

**2. Add component in the configuration file**

Add "linagora.esn.article" in config/default.json:

      "modules": [
        "linagora.esn.core.webserver",
        "linagora.esn.core.wsserver",
        "linagora.esn.article"
      ],

**3. Create symlink**

In your OpenPaaS ESN directory

    cd path_to_rse
    ln -s path_to_article modules/linagora.esn.article
