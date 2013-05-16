
# ua-templatelanguage

A slightly more capable template parser, written as part of a technical evaluation.

Given the following template:

```django
<ul>
{% for item in items %}
    <li>{% if item.okay %}it's okay{% else %}it's not okay{% endif %}</li>
{% endfor %}
</ul>
{{ message }}
```

and the following code:

```javascript
var language = require('ua-templatelanguage')
  , if_tag = require('your-if-tag')
  , for_tag = require('your-for-tag')
  , compile
  , template

compile = language({
    'if': if_tag
  , 'for': for_tag
})

template = compile("<template string from above>")

template({
    items: [{okay: true}, {okay: false}]
  , message: "hello world"
}) // should render the above template
```

we should render something like this:
```
<ul>
	<li>it's okay</li>
	<li>it's not okay</li>
</ul>
hello world
```		

## Areas for improvement: ##
* nested tags.
* trim unnecessary newlines.


## LICENSE 

MIT
