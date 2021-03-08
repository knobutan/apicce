const { execSync } = require('child_process')
const express = require('express');
const app = express();

var apik
var s
var org

app.get('/get/orgs', function (req, res) {
    var apik = req.header('apik')
    var s = req.header('server')
      
    //Login 
    var stdout = execSync('apic -v')
    try
    {
        var stdout2 = execSync('apic login -s '+s+' -k '+apik)
    }
    catch
    {
        res.send(error.message+' '+error.stderr.toString())
    }

    //Get org list
    var stdout3 = execSync('apic orgs -s '+s)
    
    //Show res
    res.send(`-----RESULT-----\napic -v: ${stdout.toString()}Login attempt: ${stdout2.toString()} \nOrg list: \n${stdout3.toString()}`)
});

app.get('/get/catalogs', function (req, res) {
    var apik = req.header('apik')
    var s = req.header('server')
    var org = req.header('org')
    
    //Login 
    try
    {
        var stdout2 = execSync('apic login -s '+s+' -k '+apik)
    }
    catch
    {
        res.send(error.message+' '+error.stderr.toString())
    }

    //Get catalogs for each org
    var stdout5 = execSync('apic catalogs -s '+s+' -o '+org)
    
    //Convert to string and grab detail
    var clist = stdout5.toString().split("\n")
    var cdetail=""
    var cres=""
    for(var i=0;i<clist.length;++i)
    {
        var ind = clist[i].lastIndexOf('catalogs/')
        if(ind==-1){break}
        var cname = clist[i].substr(ind+9)
        //console.log(i+" "+cname+" "+clist.length)
        cdetail = execSync('apic catalogs:get '+cname+' -s '+s+' -o '+org)
        cres += clist[i]+cdetail+"\n"
    }
    
    //Show res
    res.send(`-----RESULT-----\nLogin attempt: ${stdout2.toString()}\nCatalog list: \n${cres}`)
});

app.get('/get/members', function (req, res) {
    var apik = req.header('apik')
    var s = req.header('server')
    var org = req.header('org')
    
    //Login 
    try
    {
        var stdout2 = execSync('apic login -s '+s+' -k '+apik)
    }
    catch
    {
        res.send(error.message+'\n'+error.stderr.toString())
    }

    //Get　members
    var stdout3 = execSync('apic members:list -s '+s+' -o '+org)
    
    //Show res
    res.send(`-----RESULT-----\nLogin attempt: ${stdout2.toString()} \nMember list: \n${stdout3.toString()}`)
});

app.get('/get/change', function (req, res) {
    var apik = req.header('apik')
    var s = req.header('server')
    var org = req.header('org')
    var catalog = req.header('catalog')
    var usr = req.header('user')
    
    //Login 
    try
    {
        var stdout2 = execSync('apic login -s '+s+' -k '+apik)
    }
    catch
    {
        res.send(error.toString())
        return
    }

    //Change catalog owner
    try
    {
        var stdout3 = execSync('apic catalogs:transfer '+catalog+' '+usr+' -s '+s+' -o '+org)
    }
    catch(error)
    {
        res.send(error.message)
    }
    
    //Show res
    res.send(`-----RESULT-----\nLogin attempt: ${stdout2.toString()}\n${stdout3.toString()}`)
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  var init = execSync('yes | apic -v')
  console.log('apic tool app listening');
});
