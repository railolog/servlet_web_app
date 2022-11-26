package railolog.web.lab2.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DotsManager {
    private List<Dot> dotsList = Collections.synchronizedList(new ArrayList<Dot>());

    public void insert(Dot dot){
        dotsList.add(dot);

        if (dotsList.size() > 8){
            dotsList.remove(0);
        }
    }

    public List<Dot> getDotsList() {
        return dotsList;
    }
}
