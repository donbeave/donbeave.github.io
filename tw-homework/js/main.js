

var ResourceItem = React.createClass({displayName: "ResourceItem",
    getInitialState: function () {
        return {deleted: false}
    },

    handleClick: function (e) {
        this.setState({deleted: true});
    },

    render: function () {
        var result = React.createElement("span", null);

        if (!this.state.deleted) {
            result = React.createElement("span", {className: "resource"}, this.props.resource, 
                React.createElement("i", {onClick: this.handleClick.bind(this, 1), className: "icon-remove-sign"}));
        }
        return (result);
    }
});




var DenyItem = React.createClass({displayName: "DenyItem",
    render: function () {
        return (
            React.createElement("span", null, 
                React.createElement("i", {className: "icon-ban-circle"}), " ", React.createElement("a", {href: "#"}, "Deny")
            )
        )
    }
});




var Popover = React.createClass({displayName: "Popover",
    handleClick: function () {
        var element = React.findDOMNode(this.refs.textBox);
        var value = element.value;
        var list = value.split(',');

        var result = [];

        for (var i = 0; i < list.length; i++) {
            if (list[i].trim())
                result.push(list[i].trim());
        }

        element.value = '';

        this.props.onAddResource(result);
    },

    render: function () {
        return (
            React.createElement("div", {className: "popover"}, 
                React.createElement("div", null, 
                    React.createElement("p", null, "(separate multiple resources name with commas)"), 
                    React.createElement("input", {type: "text", ref: "textBox"})
                ), 
                React.createElement("div", {className: "buttons"}, 
                    React.createElement("a", {href: "javascript:", onClick: this.handleClick, ref: "submitButton"}, "Add resources"), 
                    React.createElement("a", {href: "javascript:", onClick: this.props.onClosePopover, ref: "closeButton"}, "Close")
                )
            )
        )
    }
});







var AgentItem = React.createClass({displayName: "AgentItem",
    getInitialState: function () {
        return {resources: [], initialized: false}
    },

    showResourcePopover: function (e) {
        React.findDOMNode(this.refs.popover).className = 'popover showing';
    },

    onClosePopover: function (e) {
        React.findDOMNode(this.refs.popover).className = 'popover';
    },

    onAddResource: function (list) {
        var resources = this.state.resources;

        for (var i = 0; i < list.length; i++) {
            resources.push(list[i]);
        }

        this.setState({resources: resources});
    },

    render: function () {
        if (!this.state.initialized) {
            this.state.resources = this.props.resources ? this.props.resources : [];
            this.state.initialized = true;
        }

        var className = 'agent-item' + (this.props.denied ? ' denied' : '');
        var deny;

        if (!this.props.denied)
            deny = React.createElement(DenyItem, null);

        var resources = this.state.resources.map(function (resource) {
            return React.createElement(ResourceItem, {key: resource, resource: resource})
        });

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "agent-divider"}), 
                React.createElement("div", {className: className}, 
                    React.createElement("table", null, 
                        React.createElement("tr", null, 
                            React.createElement("td", {className: "icon"}, 
                                React.createElement("div", {className: "img"})
                            ), 

                            React.createElement("td", null, 
                                React.createElement("table", {className: "main-data"}, 
                                    React.createElement("td", null, 
                                        React.createElement("strong", {className: "agent-heading"}, this.props.heading)
                                    ), 
                                    React.createElement("td", null, 
                                        React.createElement("span", {className: "delimeter"}, "|"), 
                                        " ", 
                                        React.createElement("span", {className: "status"}, this.props.status), 
                                        " ", 
                                        React.createElement("span", {className: "delimeter"}, "|"), 
                                        " ", 
                                        React.createElement("strong", {className: "host"}, this.props.host), 
                                        " ", 
                                        React.createElement("span", {className: "delimeter"}, "|"), 
                                        " ", 
                                        React.createElement("span", {className: "path"}, this.props.path)
                                    )
                                ), 
                                React.createElement("table", {className: "resources-data"}, 
                                    React.createElement("td", null, 
                                        React.createElement("i", {className: "icon-plus"}), 
                                        " ", 
                                        React.createElement("a", {href: "javascript:", ref: "addResourceButton", 
                                           onClick: this.showResourcePopover}, 
                                            "Specify Resources"), 
                                        " ", 
                                        React.createElement("span", {className: "delimeter"}, "|"), 
                                        " Resources: ", 
                                    React.createElement("span", {className: "resources-list"}, 
                                        resources
                                    )
                                    ), 
                                    React.createElement("td", {className: "deny-container"}, 
                                        deny
                                    )
                                ), 
                                React.createElement(Popover, {ref: "popover", onClosePopover: this.onClosePopover, 
                                         onAddResource: this.onAddResource})
                            )
                        )
                    )
                )
            )
        )
    }
});





var AgentsList = React.createClass({displayName: "AgentsList",
    getDataFromServer: function () {
        return [
            {
                heading: 'bjstdmngbgr02.thoughtworks.com',
                status: 'idle',
                host: '192.168.1.2',
                path: '/var/lib/cruise-agent',
                resources: ['ubuntu', 'firefox3'],
                denied: false
            },
            {
                heading: 'bjstdmngbgr03.thoughtworks.com',
                status: 'idle',
                host: '192.168.1.3',
                path: '/var/lib/cruise-agent',
                resources: ['ubuntu', 'firefox3', 'mysql', 'core-duo'],
                denied: true
            },
            {
                heading: 'bjstdmngbgr04.thoughtworks.com',
                status: 'idle',
                host: '192.168.1.4',
                path: '/var/lib/cruise-agent',
                resources: ['ubuntu', 'firefox3', 'mysql', 'core-duo'],
                denied: true
            },
            {
                heading: 'bjstdmngbgr05.thoughtworks.com',
                status: 'idle',
                host: '192.168.1.5',
                path: '/var/lib/cruise-agent',
                resources: ['ubuntu'],
                denied: false
            }
        ];
    },

    render: function () {
        var data = this.getDataFromServer();

        var agents = data.map(function (agent) {
            return React.createElement(AgentItem, {heading: agent.heading, status: agent.status, host: agent.host, path: agent.path, 
                              resources: agent.resources, denied: agent.denied})
        });

        return (
            React.createElement("div", {className: "agents-list"}, 
                agents
            )
        )
    }
});




React.render(React.createElement(AgentsList, null), document.getElementById('leftContent'));