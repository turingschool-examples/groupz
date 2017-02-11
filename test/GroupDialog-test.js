var expect = require('chai').expect;
var sinon = require('sinon');

var GroupDialog = require('../lib/GroupDialog.js');

describe('GroupDialog', function(){
  var groupDialog, rl;

  beforeEach(function(){
    rl = {
      close: sinon.spy(),
      question: sinon.spy()
    };
    var students = ['fred', 'mary', 'beth', 'kenji'];
    groupDialog = new GroupDialog(rl, students);
  });

  it('initializes with no created groups', function(){
    expect(groupDialog.groups).to.deep.equal([]);
  });

  describe('.handleGroupSizeResponse', function(){
    context('if answer is not a string digit', function(){
      it('closes the readline', function(){
        groupDialog.handleGroupSizeResponse('t');
        expect(rl.close.called).to.equal(true);
      });
    });

    context('if answer is a string digit', function(){
      it('sets the num property of the dialog', function(){
        groupDialog.handleGroupSizeResponse('4');
        expect(groupDialog.num).to.equal(4);
      });

      it('begins the group acceptance loop', function(){
        var loop = sinon.spy(groupDialog, 'startAcceptanceLoop');
        groupDialog.handleGroupSizeResponse('4');
        expect(loop.called).to.equal(true);
      });
    });
  });

  describe('.handleAcceptanceResponse', function(){
    context('if answer matches y', function(){
      it('it adds students to the groups', function(){
        groupDialog.handleAcceptanceResponse(['edward'], 'y');
        expect(groupDialog.groups).to.deep.equal([['edward']]);
      });

      it('begins the group acceptance loop', function(){
        var loop = sinon.spy(groupDialog, 'startAcceptanceLoop');
        groupDialog.handleAcceptanceResponse([], 'y');
        expect(loop.called).to.equal(true);
      });
    });

    context('if answer does not match y', function(){
      it('returns students to subject\'s students property', function(){
        expect(groupDialog.students.length).to.equal(4);
        groupDialog.handleAcceptanceResponse(['edward'], 'u8969');
        expect(groupDialog.students.length).to.equal(5);
      });

      it('begins the group acceptance loop', function(){
        var loop = sinon.spy(groupDialog, 'startAcceptanceLoop');
        groupDialog.handleAcceptanceResponse(['edward'], 'u8969');
        expect(loop.called).to.equal(true);
      });
    });
  });
});