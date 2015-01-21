var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require("../../models/Job");
var Promise = require("bluebird");
var jobsData = require("../../job-data.js");


function resetJobs()
{
    return new Promise( function(resolve,reject) {
        mongoose.connection.collections["jobs"].drop(resolve, reject);
    });
}


describe("get jobs", function() {
    var jobList;
    
    before(function(done) {
        jobsData.connectDB("mongodb://superuser:superuser@ds031531.mongolab.com:31531/jobfinder")
        .then(resetJobs)
        .then(jobsData.seedJobs)
        .then(jobsData.findJobs)
        .then(function( collection) { 
            jobList = collection;
            done();
        })
    });
    
    after(function() {
       mongoose.connection.close(); 
    });
    
    it("should never be empty since jobs are seeded", function() {
        expect(jobList.length).to.be.at.least(1);  
    });
    
    it("should have a job with a title", function() {
        expect(jobList[0].title).to.not.be.empty;
    })
    
    it("should have a job with a description", function() {
        expect(jobList[0].description).to.not.be.empty;
    })
});

describe("save jobs", function() {
    var job = {title:"Cook", description:"You will be making bagels"};
    var jobList;
    
    function saveTestJob() {
        return jobsData.saveJob(job);    
    }
    
    before(function(done) {
        jobsData.connectDB("mongodb://superuser:superuser@ds031531.mongolab.com:31531/jobfinder")
        .then(resetJobs)
        .then(function() { return jobsData.saveJob(job)})
        .then(jobsData.findJobs)
        .then(function setJob( collection) { 
            jobList = collection;
            done();
        })
    });
    
    after(function() {
       mongoose.connection.close(); 
    });
    
    it("should have one  job after saving one job", function() {
        expect(jobList).to.have.length(1);  
    });

});