!function () {
  var model = {
    // 获取数据
    init: function () {
      var APP_ID = 'Gv439DyajeYOpo3JD96U4BXB-gzGzoHsz'
      var APP_KEY = 'KK9mQ0dSUh9RuiOjCX2Mb2hS'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function (name, content, role) {
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  // Promise 对象
        'name': name,
        'content': content,
        'role': role
      })
    }
  }

  var view = document.querySelector('section.message')


  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `(${item.name}) ${item.content}【${item.role}】`
            this.messageList.appendChild(li)
          })
        }
      )
    },
    bindEvents: function () {
      this.form.addEventListener('submit', function (e) {
        e.preventDefault()
        this.saveMessage()
      }.bind(this))
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      let role = myForm.querySelector('select[name=role]').value
      if (!content || !name || !role) {
        alert('请输入所有表单项！')
        return false;
      }
      this.model.save(name, content, role).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `(${object.attributes.name}) ${object.attributes.content} 【${object.attributes.role}】`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        myForm.querySelector('input[name=name]').value = ''
        myForm.querySelector('select[name=role]').value = ''
      })
    }

  }

  controller.init(view, model)


}.call()

