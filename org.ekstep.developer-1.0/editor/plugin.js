EkstepEditor.basePlugin.extend({
    initialize: function() {
        EkstepEditorAPI.addEventListener("org.ekstep.developer:loadplugin", this.loadPlugin, this);
        EkstepEditorAPI.addEventListener("org.ekstep.developer:getPlugins", this.listPlugins, this);
        EkstepEditorAPI.addEventListener("org.ekstep.developer:updateLocalServerPath", this.updateLocalServerPath, this);
        
        var scope = EkstepEditorAPI.getAngularScope();
        scope.localServerPath = scope.localServerPath || EkstepEditor.hostRepo.basePath;
        scope.configMenus = scope.configMenus || [];
        if (scope.developerMode) {
            scope.configMenus.push({
                "id": "developer",
                "category": "config",
                "type": "icon",
                "toolTip": "Developer",
                "title": "Developers",
                "iconClass": "code icon",
                "onclick": {
                    "id": "config:developer:show"
                }
            });    
        }
        scope.localServerPathEdit = false;
        EkstepEditorAPI.ngSafeApply(scope, function() {});
    },
    loadPlugin: function(event, data) {
        var scope = EkstepEditorAPI.getAngularScope();
        var idx = data.plugin.lastIndexOf("-");
        var pluginId = data.plugin.substr(0, idx);
        var pluginVer = data.plugin.substr(idx + 1, data.plugin.length);
        EkstepEditorAPI.loadAndInitPlugin(pluginId, pluginVer, (new Date()).getTime());
    },
    listPlugins: function(event, data) {
        var scope = EkstepEditorAPI.getAngularScope();
        scope.localPlugins = [];
        scope.contributedPluginMessageClass = "";
        scope.contributedPluginMessage = "";
        EkstepEditorAPI.jQuery.ajax({
            type: 'GET',
            url: EkstepEditor.hostRepo.basePath+"/list",
            beforeSend: function() {
                scope.localPluginsPlugins = true;
                EkstepEditorAPI.ngSafeApply(scope, function() {});
            },
            success: function(data) {
                if (EkstepEditorAPI._.isArray(data) && data.length === 0) {
                    scope.contributedPluginMessageClass = "info";
                    scope.contributedPluginMessage = "No plugins found.";
                }
                if(EkstepEditorAPI._.isArray(data)){
                    scope.localPlugins = data;
                }
                EkstepEditorAPI.ngSafeApply(scope, function() {});
                //EkstepEditor.stageManager.reloadStages();
            },
            error: function(err) {
                scope.contributedPluginMessageClass = "error";
                scope.contributedPluginMessage = "Unable to loadPlugins.";
            },
            complete: function () {
                scope.loadingContributedPlugins = false;
                EkstepEditorAPI.ngSafeApply(scope, function() {});
            }
        });

    },
    updateLocalServerPath: function (event, data) {
        var scope = EkstepEditorAPI.getAngularScope();
        EkstepEditor.hostRepo.basePath = data.path;
        scope.localServerPathEdit = false;
        EkstepEditorAPI.ngSafeApply(scope, function() {});
        this.listPlugins();
    }
});
//# sourceURL=developerplugin.js