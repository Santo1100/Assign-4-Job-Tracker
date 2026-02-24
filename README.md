ans1: getElementById = returns single element by ID or null
getElementsByClassName= returns  HTMLCollection of elements that has the same  class name
querySelector= returns first matching element or null.
querySelectorAll = returns static NodeList using any CSS selector. It is a better choice than getElementsByClassName().

ans2: const div = document.createElement('div');           
div.textContent = 'Hello';   
document.body.append(div)

ans3: Events start from the target element and bubble up through its ancestors to the root.

ans4:You attach one event listener to a parent element instead of many individual children. it works for dynamically added elements and uses much less memory.

ans5: preventDefault()= stops the default browser behavior  such as link navigation.
stopPropagation() = stops the event from bubbling up or reaching  to parent elements
