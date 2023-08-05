const axiosInstancePost = function () {
    const getBaseUrl = function () {
        return BaseUrl;
    };

    const axiosObject = axios.create({
        baseURL: getBaseUrl(),
        timeout: 30000
    });
    return axiosObject;
};
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const axiosInstance = function () {
    const getBaseUrl = () => {
        return BaseUrl;
    }
    const axiosObejct = axios.create({
        baseURL: getBaseUrl(),
        timeout: 40000
    });
    return axiosObejct;
};


new Vue({
    el: '#seasonapp_main',
    data() {
        return {
            formModel: {
                dropId: "",
                dropCode: "",
                title: "",
                description: "",
                status: "",
                plannedStartDate: "",
                plannedEndDate: "",
                actualStartDate: "",
                actualEndDate: "",
                parentTaskId: ""
            },
            seasonStatus : []
        };
    },
    async beforeCreate() {
        var self = this;
        //Brands
        await axiosInstance()
            .get('Season/GetMilestoneStatus')
            .then(function (response) {
                self.seasonStatus = response.data.itemType;
            });
    },
    mounted() {
        var self = this;
        
    },
    methods: {
        showAddMilestonesModel(dropid,dropcode,seasonId) {
            var self = this;
            self.formModel = {};
            self.formModel.dropId = dropid;
            self.formModel.dropCode = dropcode;
            self.formModel.seasonId = seasonId;
            self.formModel.parentTaskId = dropid;
            self.$modal.show('addMilestone');
        },
        hideAddMilestonesModel() {
            var self = this;
            self.$modal.hide('addMilestone');
        },
        addMilestone() {
            var self = this;
            var milestoneModel = self.formModel;

            axiosInstancePost()
                .post('Season/AddSeasonDropTask', milestoneModel, axiosConfig)
                .then(function (response) {
                    if (response.data.isValid) {
                        self.hideAddMilestonesModel();
                        window.location.href = location.href;
                    }
                })
                .catch(function (error) {
                });
        },
        confirmationModalShow(type, name, seasonid, dropid, droptaskid) {
            var self = this;
            var text = "";
            switch (type) {
                case 1:
                    text = "season " + name;  
                    break;
                case 2:
                    text = "drop " + name;
                    break;
                case 3:
                    text = "task " + name;
                    break;
            }
            self.$modal.show('dialog', {
                title: 'Confirmation !',
                height: '100',
                text: 'Are you sure you want to delete ' + text + ' ?',
                buttons: [
                    {
                        title: 'Ok',
                        class: 'btn btn-danger',
                        handler: () => {
                            switch (type) {
                                case 1:
                                    self.deleteSeason(seasonid);
                                    break;
                                case 2:
                                    self.deleteDrop(dropid, seasonid);
                                    break;
                                case 3:
                                    self.deleteDropTask(droptaskid, seasonid);
                                    break;
                            }
                            self.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'Close'
                    }
                ]
            })
        },
        deleteSeason(id) {
            if (id != null) {
                location.href = 'Season/DeleteSeason?id=' + id;
            }
        },
        deleteDrop(dropid,seasonid) {
            if (dropid != null && seasonid!= null) {
                location.href = location.origin +'/Season/DeleteSeasonDrop?dropid=' + dropid + '&seasonid=' + seasonid;
            }
        },
        deleteDropTask(droptaskid, seasonid) {
            if (droptaskid != null && seasonid != null) {
                var a = location;
                location.href = location.origin +'/Season/DeleteDropTask?dropTaskId=' + droptaskid + '&seasonid=' + seasonid;
            }
        }
    }
})
Vue.config.devtools = true;