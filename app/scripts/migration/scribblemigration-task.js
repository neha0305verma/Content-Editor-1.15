'use strict';

EkstepEditor.migration.scribblemigration_task = new(Class.extend({
    init: function() {
        console.log('scribble migration task initialized');
    },
    id: 'org.ekstep.scribblepad',    
    migrate: function(contentbody) {
    	console.log('migrating scribblepad');
    	var deferred = EkstepEditor.$q.defer(),
    			instance = this;

        _.forEach(contentbody.theme.stage, function(stage, index) {
            if (stage.scribble && (!_.isArray(stage.scribble))) stage.scribble = [stage.scribble];
            if (stage.scribble && stage.scribble.length) {
                stage[instance.id] = stage.scribble;
                delete stage.scribble;
            }            
            EkstepEditor.migration.imagemigration_task.removeImage(stage, 'domain_38441_trash');                
            instance.removeEraserMedia(contentbody);
            if(contentbody.theme.stage.length === index + 1) deferred.resolve(contentbody);
        });
        return deferred.promise;
    },
    removeEraserMedia: function(contentbody) {
        _.forEach(_.clone(contentbody.theme.manifest.media), function(media, index) {
            if (media.assetId === "domain_38441_trash") contentbody.theme.manifest.media.splice(index, 1);
        });
    }
}))