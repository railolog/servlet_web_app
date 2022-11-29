package railolog.web.lab2.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DotsManager {
    private final List<Dot> dotsList = Collections.synchronizedList(new ArrayList<Dot>());

    public void insert(Dot dot){
        synchronized (dotsList) {
            if (!dotsList.isEmpty() && dotsList.lastIndexOf(null) == dotsList.size() - 1 && dot != null) {
                dotsList.remove(dotsList.size() - 1);
            }
            if (!(dotsList.lastIndexOf(null) == dotsList.size() - 1 && dot == null) || dotsList.isEmpty()) {
                dotsList.add(dot);
            }

            /*if (dotsList.size() > 8){
                dotsList.remove(0);
            }*/
        }
    }

    public List<Dot> getDotsList() {
        return dotsList;
    }
}
