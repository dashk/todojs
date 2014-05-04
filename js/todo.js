(function(global) {
  'use strict';

  var App = {},
      doc = global.document;

  // "Constants"
  var TASK_ITEM_TEMPLATE_NAME = 'task-item-template',
      TASK_ITEM_CHECKED_CSS = 'is-checked';

  // Locate elements we care about
  var addButtonEl = doc.getElementById('add-task-button'),
      taskInputEl = doc.getElementById('task-input'),
      taskListEl = doc.querySelector('.task-list');

  // Helper functions
  /**
   * Gets template string, and replaces variables in the string
   * with given data.
   *
   * (This is like a "mini" templating engine)
   * 
   * @param {String} templateId
   * @param {Object} [data] Key/Value pair that template variables will be
   * replaced with.
   * @returns {String}
   **/
  function getTemplate(templateId, data) {
     var templateString = doc.getElementById(templateId).innerHTML,
         fragEl = doc.createElement('span'),
         escapedValue;

     if (data) {
       for (var key in data) {
         if (data.hasOwnProperty(key)) {
           // Escaped value before replacing it in template string
           fragEl.textContent = data[key];
           escapedValue = fragEl.innerHTML;
           
           // Replace value in string
           templateString = templateString.replace('$' + key + '$', escapedValue, 'g');
         }
       }
     }

     return templateString;
  }
  
  /**
   * Creates a task element
   *
   * @param {String} name
   * @returns {Element}
   **/
  function createTaskElement(name) {
    var taskEl = doc.createElement('div');

    taskEl.innerHTML = getTemplate(TASK_ITEM_TEMPLATE_NAME, {
      name: name       
    });

    return taskEl.children[0];
  }

  /**
   * When add task button is clicked
   *
   * @param {Event} e
   * @returns {void}
   **/
  function onAddTaskButtonClicked(e) {
    var taskName = taskInputEl.value.trim(),
        taskEl;

    // Prevent the form from being submitted
    e.preventDefault();
    e.stopPropagation();

    // Add task only if task name has something
    if (taskName) {
      taskEl = createTaskElement(taskName);
      taskListEl.appendChild(taskEl);
    }

    // Always clear input (If user have entered just spaces, we will still clear
    // it for them.)
    taskInputEl.value = '';
  }

  /**
   * When a task's status has been updated
   *
   * @param {Event} e
   * @returns {void}
   **/
  function onTaskStateChanged(e) {
    // This function only cares about checkbox changes
    if (e.target.getAttribute('type') !== 'checkbox') {
      return;
    }

    // Find its task element
    var taskEl = e.target.parentNode.parentNode;
   
    // Add/remove class based on state
    if (e.target.checked) {
      taskEl.classList.add(TASK_ITEM_CHECKED_CSS);
    } else {
      taskEl.classList.remove(TASK_ITEM_CHECKED_CSS);
    }
  }

  /**
   * Initializes the App
   *
   * @returns {void}
   **/
  App.init = function() {
    addButtonEl.addEventListener('click', onAddTaskButtonClicked);
    taskListEl.addEventListener('change', onTaskStateChanged);
  };
      

  global.App = App;
})(window);
