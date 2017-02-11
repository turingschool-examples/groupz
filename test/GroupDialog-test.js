var expect = require('chai').expect;
var sinon = require('sinon');

var GroupDialog = require('../lib/GroupDialog.js');

describe('GroupDialog', function(){
  var groupDialog, rl;

  beforeEach(function(){
    sinon.stub(console, 'log');
    rl = {
      close: sinon.spy(),
      question: sinon.spy()
    };
    groupDialog = new GroupDialog(rl, ['fred', 'mary', 'beth', 'kenji']);
  });

  afterEach(function() {
    console.log.restore();
  });

  it('initializes with no created groups', function(){
    expect(groupDialog.groups).to.deep.equal([]);
  });

  describe('.getGroupCount', function(){
    context('if answer is not a string digit', function(){
      it('closes the readline', function(){
        groupDialog.getGroupCount('t');
        expect(rl.close.called).to.equal(true);
      });
    });
    context('if answer is a string digit', function(){
      it('sets the num property of the dialog', function(){
        groupDialog.getGroupCount('4');
        expect(groupDialog.num).to.equal(4);
      });

      it('begins the group acceptance loop', function(){
        var loop = sinon.spy(groupDialog, 'startAcceptanceLoop');
        groupDialog.getGroupCount('4');
        expect(loop.called).to.equal(true);
      });
    });
  });
});