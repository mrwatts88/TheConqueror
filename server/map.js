const theMap = [["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "0", "0", "0", "0", "0", "0", "w", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "i", "0", "i", "0", "0", "0", "i", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "0", "0", "w", "w", "0", "0", "w", "0", "0", "0", "0", "0", "w", "w", "0", "0", "0", "w", "0", "0", "0", "w", "0", "0", "0", "w", "w", "0", "w", "0", "w", "0", "w", "w", "w"], ["w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "w", "w", "w", "0", "w", "w", "w", "0", "w", "w", "w", "0", "w", "0", "w", "0", "w", "w", "w"], ["w", "w", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "i", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "i", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w"], ["w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "i", "0", "i", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "i", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w"], ["w", "w", "0", "0", "0", "0", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "w", "w", "w", "0", "w", "w", "w", "0", "w", "w", "w", "0", "w", "0", "w", "0", "w", "w", "w"], ["w", "w", "w", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "0", "0", "0", "w", "0", "0", "0", "w", "0", "0", "0", "w", "w", "0", "w", "0", "w", "0", "w", "w", "w"], ["w", "w", "w", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "0", "0", "0", "0", "w", "w", "0", "0", "w", "w", "0", "w", "0", "0", "0", "p", "w", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "0", "0", "0", "0", "w", "w", "0", "0", "w", "w", "0", "0", "0", "w", "w", "0", "0", "0", "w", "w", "w", "0", "m", "i", "p", "i", "i", "0", "i", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "0", "0", "0", "0", "w", "w", "0", "0", "w", "w", "m", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "w", "0", "0", "0", "0", "w", "0", "w", "w", "w", "0", "0", "0", "0", "w", "w", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "w", "w", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "0", "0", "0", "p", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "0", "0", "w", "w", "m", "0", "i", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "w", "0", "w", "w", "0", "w", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "p", "0", "0", "m", "0", "0", "0", "m", "0", "m", "0", "0", "0", "p", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "i", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "0", "0", "0", "w", "w", "w", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "0", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "i", "0", "0", "0", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "i", "0", "w", "w", "0", "0", "w", "w", "0", "i", "0", "0", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "0", "0", "w", "w", "0", "0", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "0", "i", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "0", "0", "0", "w", "w", "0", "w", "w", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "0", "0", "0", "w", "w", "0", "0", "w", "0", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "0", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "0", "w", "0", "0", "0", "w", "w", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "0", "0", "0", "w", "w", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "w", "w", "w", "0", "0", "0", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "i", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "i", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "0", "0", "0", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"], ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]]

exports.getTheMap = () => theMap;