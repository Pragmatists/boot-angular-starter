package pl.pragmatists.starter.transients;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Stream;

import pl.pragmatists.starter.Repository;

public abstract class TransientRepository<T> implements Repository<T> {
    protected final List<T> storage;

    protected final Predicate<T> predicate;

    protected TransientRepository() {
        predicate = o -> true;
        storage = new LinkedList<>();
    }

    public TransientRepository(List<T> storage, Predicate<T> predicate) {
        this.storage = storage;
        this.predicate = predicate;
    }

    @Override
    public Optional<T> findOne() {
        return list().findFirst();
    }

    @Override
    public Optional<T> remove() {
        Optional<T> toRemove = findOne();
        if(toRemove.isPresent()) {
            storage.remove(toRemove.get());
        }
        return toRemove;
    }

    @Override
    public Stream<T> list() {
        return storage.stream()
                      .filter(predicate);
    }

    public void add(T property) {
        storage.add(property);
    }

    public void clear() {
        storage.clear();
    }
}
