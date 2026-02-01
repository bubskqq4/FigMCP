// This widget will open an Iframe window with buttons to show a toast message and close the window.

const { widget } = figma
const { useEffect, Text } = widget

function Widget() {
  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === 'showToast') {
        figma.notify('Hello widget')
      }
      if (msg.type === 'close') {
        figma.closePlugin()
      }
    }
  })

  return (
    <Text
      fontSize={24}
      onClick={
        // Use async callbacks or return a promise to keep the Iframe window
        // opened. Resolving the promise, closing the Iframe window, or calling
        // "figma.closePlugin()" will terminate the code.
        () =>
          new Promise((resolve) => {
            figma.showUI(__html__)
          })
      }
    >
      Open IFrame
    </Text>
  )
}

widget.register(Widget)
